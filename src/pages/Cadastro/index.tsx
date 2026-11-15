import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useCadastrar, useConferirEmail, useUsuarioAtual } from '../../features/auth'
import { documentosKeys, type AceiteDocumento } from '../../features/documentos'
import { ErroApi } from '../../lib/api/erros'
import { ROTAS } from '../../routes/paths'
import { EtapaDados, type CamposCadastro } from './components/EtapaDados/EtapaDados'
import { EtapaTermos } from './components/EtapaTermos/EtapaTermos'
import styles from './index.module.scss'

const EMAIL_JA_CADASTRADO =
  'Já existe uma conta com este e-mail. Entre na sua conta ou use "Esqueci minha senha".'

export default function Cadastro() {
  const navigate = useNavigate()
  const [etapa, setEtapa] = useState<1 | 2>(1)
  const { data: usuario } = useUsuarioAtual()
  const cadastrar = useCadastrar()
  const conferirEmail = useConferirEmail()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setError,
    control,
    formState: { errors },
  } = useForm<CamposCadastro>({ defaultValues: { nome: '', email: '', senha: '' } })
  // Acompanha a senha digitada para marcar os requisitos na hora
  const senha = useWatch({ control, name: 'senha' })

  // Só avança para os termos com os dados válidos e o e-mail ainda sem conta
  async function continuar() {
    const valido = await trigger(['nome', 'email', 'senha'])
    if (!valido) return
    conferirEmail.mutate(getValues('email').trim(), {
      onSuccess: (disponivel) => {
        if (disponivel) {
          setEtapa(2)
        } else {
          setError('email', { message: EMAIL_JA_CADASTRADO })
        }
      },
    })
  }

  // Os aceites vêm da etapa 2 (versões que a tela mostrou); os dados, do formulário
  function criarConta(aceites: AceiteDocumento[]) {
    void handleSubmit((campos) => {
      cadastrar.mutate(
        { nome: campos.nome.trim(), email: campos.email.trim(), senha: campos.senha, aceites },
        {
          // A conta nasce já com a sessão aberta
          onSuccess: () => navigate(ROTAS.inicio, { replace: true }),
          // Erro de um campo dos dados (ex.: e-mail já cadastrado): volta à etapa 1 com a mensagem nele
          onError: (erro) => {
            const porCampo = erro instanceof ErroApi ? erro.campos : {}
            const camposDados = (['nome', 'email', 'senha'] as const).filter((campo) => porCampo[campo])
            camposDados.forEach((campo) => setError(campo, { message: porCampo[campo] }))
            if (camposDados.length > 0) {
              cadastrar.reset()
              setEtapa(1)
            }
            // Os termos mudaram enquanto a pessoa lia (409): busca o texto novo para aceitar de novo
            if (porCampo.aceites) {
              void queryClient.invalidateQueries({ queryKey: documentosKeys.vigentes() })
            }
          },
        },
      )
    })()
  }

  // Quem já entrou não precisa criar conta
  if (usuario && !cadastrar.isPending && !cadastrar.isSuccess) {
    return <Navigate to={ROTAS.inicio} replace />
  }

  return (
    <main className={styles.fundoMaior}>
      <div className={styles.fundoMenor}>
        <div className={`${styles.painel} ${etapa === 1 ? '' : styles.oculto}`} inert={etapa !== 1}>
          <EtapaDados
            etapaAtual={etapa}
            register={register}
            errors={errors}
            senha={senha}
            conferindo={conferirEmail.isPending}
            erro={conferirEmail.isError ? conferirEmail.error.message : null}
            onContinuar={continuar}
          />
        </div>
        <div className={`${styles.painel} ${etapa === 2 ? '' : styles.oculto}`} inert={etapa !== 2}>
          <EtapaTermos
            etapaAtual={etapa}
            criando={cadastrar.isPending}
            erro={cadastrar.isError ? cadastrar.error.message : null}
            onVoltar={() => setEtapa(1)}
            onCriar={criarConta}
          />
        </div>
      </div>
    </main>
  )
}
