import { useRef, useState, type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AvisoErro } from '../../../../components/ui/AvisoErro/AvisoErro'
import { Button } from '../../../../components/ui/Botao/Botao'
import { EstadoConsulta } from '../../../../components/ui/EstadoConsulta/EstadoConsulta'
import { useAssinaturaAtual, usePlanos } from '../../../../features/assinatura'
import {
  converterNotaEnem,
  useAtualizarPerfil,
  useEnviarFoto,
  useRemoverFoto,
  useSair,
  validarFoto,
  type UsuarioAtual,
} from '../../../../features/auth'
import { ErroApi } from '../../../../lib/api/erros'
import { formatarDataExtenso, formatarNumero } from '../../../../lib/utils'
import { ROTAS } from '../../../../routes/paths'
import { CartaoAssinatura } from '../CartaoAssinatura/CartaoAssinatura'
import { CartaoSair } from '../CartaoSair/CartaoSair'
import { FormAlterarSenha } from '../FormAlterarSenha/FormAlterarSenha'
import { FormDadosPessoais, type CamposPerfil } from '../FormDadosPessoais/FormDadosPessoais'
import { FotoPerfil } from '../FotoPerfil/FotoPerfil'
import { LayoutPerfil } from '../LayoutPerfil/LayoutPerfil'
import { SecaoPerfil } from '../SecaoPerfil/SecaoPerfil'
import styles from './PerfilLogado.module.scss'

// O botão "Salvar alterações" fica no cabeçalho, fora do <form>; o atributo
// `form` liga os dois pelo id
const ID_FORMULARIO = 'form-perfil'

type PerfilLogadoProps = {
  usuario: UsuarioAtual
}

export function PerfilLogado({ usuario }: PerfilLogadoProps) {
  const navigate = useNavigate()
  const atualizarPerfil = useAtualizarPerfil()
  const enviarFoto = useEnviarFoto()
  const removerFoto = useRemoverFoto()
  // Depois de sair, a mesma rota mostra o perfil de visitante (a tela decide pelo usuário)
  const sair = useSair({
    onSuccess: () => {
      navigate(ROTAS.perfil, { replace: true })
      window.scrollTo({ top: 0 })
    },
  })
  const consultaAssinatura = useAssinaturaAtual()
  const consultaPlanos = usePlanos()

  const inputFoto = useRef<HTMLInputElement>(null)
  const [erroFoto, setErroFoto] = useState<string | null>(null)
  // Entrou pelo código do "esqueci minha senha": o formulário de senha já abre, sem pedir a atual
  const semSenhaAtual =
    usuario.trocaSenhaSemAtualAte !== null && new Date(usuario.trocaSenhaSemAtualAte) > new Date()
  const [alterandoSenha, setAlterandoSenha] = useState(semSenhaAtual)
  const [senhaAlterada, setSenhaAlterada] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<CamposPerfil>({
    defaultValues: {
      nome: usuario.nome,
      notaEnem: usuario.notaEnem === null ? '' : formatarNumero(usuario.notaEnem),
    },
  })

  const salvo = atualizarPerfil.isSuccess && !isDirty
  const criadaEm = formatarDataExtenso(usuario.criadoEm, { comDia: false, comAno: true })

  const salvar = handleSubmit((campos) => {
    atualizarPerfil.mutate(
      { nome: campos.nome.trim(), notaEnem: converterNotaEnem(campos.notaEnem) },
      {
        // Os valores salvos viram o novo "estado inicial" (o Salvar volta a ficar desabilitado)
        onSuccess: () => reset(campos),
        // A API repete as regras da tela; se recusar um campo, a mensagem aparece nele
        onError: (erro) => {
          const porCampo = erro instanceof ErroApi ? erro.campos : {}
          if (porCampo.nome) setError('nome', { message: porCampo.nome })
          if (porCampo.notaEnem) setError('notaEnem', { message: porCampo.notaEnem })
        },
      },
    )
  })

  function aoEscolherFoto(evento: ChangeEvent<HTMLInputElement>) {
    const arquivo = evento.target.files?.[0]
    // Limpa o input para permitir escolher o mesmo arquivo de novo
    evento.target.value = ''
    if (!arquivo) return

    const erro = validarFoto(arquivo)
    setErroFoto(erro)
    removerFoto.reset()
    if (!erro) enviarFoto.mutate(arquivo)
  }

  const abrirSeletorFoto = () => inputFoto.current?.click()

  function aoRemoverFoto() {
    setErroFoto(null)
    enviarFoto.reset()
    removerFoto.mutate()
  }

  // Erro da validação local ou da API (ex.: arquivo que não é imagem de verdade)
  const mensagemErroFoto =
    erroFoto ?? enviarFoto.error?.message ?? removerFoto.error?.message ?? null

  return (
    <LayoutPerfil
      foto={
        <FotoPerfil
          nome={usuario.nome}
          fotoUrl={usuario.fotoUrl}
          ocupado={enviarFoto.isPending || removerFoto.isPending}
          onEscolher={abrirSeletorFoto}
          onRemover={aoRemoverFoto}
        />
      }
      titulo={usuario.nome}
      subtitulo={`${usuario.email} · conta criada em ${criadaEm}`}
      extra={
        mensagemErroFoto && <AvisoErro className={styles.erroFoto}>{mensagemErroFoto}</AvisoErro>
      }
      acoes={
        <Button
          type="submit"
          form={ID_FORMULARIO}
          disabled={!isDirty || atualizarPerfil.isPending}
        >
          {atualizarPerfil.isPending ? 'Salvando…' : 'Salvar alterações'}
        </Button>
      }
    >
      <input ref={inputFoto} type="file" accept="image/*" hidden onChange={aoEscolherFoto} />

      <SecaoPerfil
        id="secao-dados"
        titulo="Dados pessoais"
        aviso={salvo ? 'Alterações salvas' : 'As alterações são aplicadas ao salvar'}
      >
        <FormDadosPessoais
          id={ID_FORMULARIO}
          usuario={usuario}
          register={register}
          errors={errors}
          onSubmit={salvar}
          alterandoSenha={alterandoSenha}
          onAlterarSenha={() => {
            setSenhaAlterada(false)
            setAlterandoSenha(true)
          }}
        />
        {atualizarPerfil.isError && (
          <AvisoErro className={styles.erroSalvar}>{atualizarPerfil.error.message}</AvisoErro>
        )}

        {/* Fora do <form> dos dados pessoais: é outro formulário, salvo à parte */}
        {alterandoSenha && (
          <FormAlterarSenha
            semSenhaAtual={semSenhaAtual}
            onCancelar={() => setAlterandoSenha(false)}
            onConcluir={() => {
              setAlterandoSenha(false)
              setSenhaAlterada(true)
            }}
          />
        )}
        {senhaAlterada && (
          <p className={styles.sucesso} role="status">
            Senha alterada com sucesso.
          </p>
        )}
      </SecaoPerfil>

      <SecaoPerfil
        id="secao-assinatura"
        titulo="Assinatura"
        observacao="Trocar de plano e cancelar a assinatura ficam na tela de assinatura."
      >
        {/* Só mostra depois de carregar, para não "piscar" como sem plano */}
        <EstadoConsulta
          consultas={[consultaAssinatura, consultaPlanos]}
          mensagemCarregando="Carregando assinatura…"
          tituloErro="Não foi possível carregar sua assinatura"
          compacto
        >
          {([assinatura, planos]) => (
            <CartaoAssinatura
              assinatura={assinatura}
              plano={planos.find((plano) => plano.id === assinatura?.plano)}
            />
          )}
        </EstadoConsulta>
      </SecaoPerfil>

      <CartaoSair
        descricao="Você será desconectado neste dispositivo. Seus favoritos e respostas continuam salvos."
        saindo={sair.isPending}
        onSair={() => sair.mutate()}
      />
    </LayoutPerfil>
  )
}
