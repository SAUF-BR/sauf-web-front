import { useRef, useState, type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../components/ui/Botao/Botao'
import { useAssinaturaAtual, usePlanos } from '../../../../features/assinatura'
import {
  converterNotaEnem,
  useAtualizarPerfil,
  useEnviarFoto,
  useSair,
  validarFoto,
  type UsuarioAtual,
} from '../../../../features/auth'
import { formatarDataExtenso, formatarNumero } from '../../../../lib/utils'
import { ROTAS } from '../../../../routes/paths'
import { CartaoAssinatura } from '../CartaoAssinatura/CartaoAssinatura'
import { CartaoSair } from '../CartaoSair/CartaoSair'
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
  const sair = useSair({ onSuccess: () => navigate(ROTAS.inicio) })
  const { data: assinatura, isPending: carregandoAssinatura } = useAssinaturaAtual()
  const { data: planos, isPending: carregandoPlanos } = usePlanos()

  const inputFoto = useRef<HTMLInputElement>(null)
  const [erroFoto, setErroFoto] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<CamposPerfil>({
    defaultValues: {
      nome: usuario.nome,
      notaEnem: usuario.notaEnem === null ? '' : formatarNumero(usuario.notaEnem),
    },
  })

  const planoAtual = planos?.find((plano) => plano.id === assinatura?.plano)
  const salvo = atualizarPerfil.isSuccess && !isDirty
  const criadaEm = formatarDataExtenso(usuario.criadoEm, { comDia: false, comAno: true })

  const salvar = handleSubmit((campos) => {
    atualizarPerfil.mutate(
      { nome: campos.nome.trim(), notaEnem: converterNotaEnem(campos.notaEnem) },
      // Os valores salvos viram o novo "estado inicial" (o Salvar volta a ficar desabilitado)
      { onSuccess: () => reset(campos) },
    )
  })

  function aoEscolherFoto(evento: ChangeEvent<HTMLInputElement>) {
    const arquivo = evento.target.files?.[0]
    // Limpa o input para permitir escolher o mesmo arquivo de novo
    evento.target.value = ''
    if (!arquivo) return

    const erro = validarFoto(arquivo)
    setErroFoto(erro)
    if (!erro) enviarFoto.mutate(arquivo)
  }

  const abrirSeletorFoto = () => inputFoto.current?.click()

  return (
    <LayoutPerfil
      foto={
        <FotoPerfil
          nome={usuario.nome}
          fotoUrl={usuario.fotoUrl}
          enviando={enviarFoto.isPending}
          onTrocar={abrirSeletorFoto}
        />
      }
      titulo={usuario.nome}
      subtitulo={`${usuario.email} · conta criada em ${criadaEm}`}
      extra={
        erroFoto && (
          <p role="alert" className={styles.erroFoto}>
            {erroFoto}
          </p>
        )
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
        />
      </SecaoPerfil>

      <SecaoPerfil
        id="secao-assinatura"
        titulo="Assinatura"
        observacao="Trocar de plano e cancelar a assinatura ficam na tela de assinatura."
      >
        {/* Só mostra depois de carregar, para não "piscar" como sem plano */}
        {!carregandoAssinatura && !carregandoPlanos && (
          <CartaoAssinatura assinatura={assinatura} plano={planoAtual} />
        )}
      </SecaoPerfil>

      <CartaoSair
        descricao="Você será desconectado neste dispositivo. Seus favoritos e respostas continuam salvos."
        saindo={sair.isPending}
        onSair={() => sair.mutate()}
      />
    </LayoutPerfil>
  )
}
