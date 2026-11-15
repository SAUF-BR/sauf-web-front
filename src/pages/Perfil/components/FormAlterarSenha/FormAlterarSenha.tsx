import { useForm, useWatch } from 'react-hook-form'
import { AvisoErro } from '../../../../components/ui/AvisoErro/AvisoErro'
import { Button } from '../../../../components/ui/Botao/Botao'
import { Card } from '../../../../components/ui/Card/Card'
import { CampoSenha } from '../../../../components/ui/CampoSenha/CampoSenha'
import { useAlterarSenha, validarSenha } from '../../../../features/auth'
import { RequisitosSenha } from '../../../../features/auth/components/RequisitosSenha/RequisitosSenha'
import { ErroApi } from '../../../../lib/api/erros'
import styles from './FormAlterarSenha.module.scss'

type CamposSenha = {
  senhaAtual: string
  novaSenha: string
  confirmacao: string
}

type FormAlterarSenhaProps = {
  // Logo depois de entrar pelo código do "esqueci minha senha": não pede a senha atual
  semSenhaAtual?: boolean
  onConcluir: () => void
  onCancelar: () => void
}

// Troca de senha dentro do perfil: pede a senha atual (menos logo depois de entrar pelo
// código do "esqueci minha senha") e mostra os requisitos da nova
export function FormAlterarSenha({ semSenhaAtual = false, onConcluir, onCancelar }: FormAlterarSenhaProps) {
  const alterar = useAlterarSenha()
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<CamposSenha>({ defaultValues: { senhaAtual: '', novaSenha: '', confirmacao: '' } })
  const novaSenha = useWatch({ control, name: 'novaSenha' })

  const salvar = handleSubmit((campos) => {
    alterar.mutate(
      semSenhaAtual
        ? { novaSenha: campos.novaSenha }
        : { senhaAtual: campos.senhaAtual, novaSenha: campos.novaSenha },
      {
        onSuccess: onConcluir,
        // A API confere a senha atual e a regra da nova: a mensagem aparece no campo
        onError: (erro) => {
          const porCampo = erro instanceof ErroApi ? erro.campos : {}
          if (porCampo.senhaAtual) setError('senhaAtual', { message: porCampo.senhaAtual })
          if (porCampo.novaSenha) setError('novaSenha', { message: porCampo.novaSenha })
        },
      },
    )
  })

  const erroSemCampo =
    alterar.isError && !(alterar.error instanceof ErroApi && Object.keys(alterar.error.campos).length > 0)

  return (
    <Card className={styles.cartao}>
      <form className={styles.form} onSubmit={salvar} noValidate aria-labelledby="titulo-alterar-senha">
        <div className={styles.cabecalho}>
          <h3 id="titulo-alterar-senha" className={styles.titulo}>
            {semSenhaAtual ? 'Criar nova senha' : 'Alterar senha'}
          </h3>
          <p className={styles.descricao}>
            {semSenhaAtual
              ? 'Escolha uma senha nova para entrar nos próximos acessos.'
              : 'Confirme sua senha atual e escolha uma nova. Evite usar a mesma senha de outros sites.'}
          </p>
        </div>
        {semSenhaAtual && (
          <p className={styles.aviso}>
            Você entrou com o código enviado ao seu e-mail. Crie uma senha nova para os próximos acessos.
          </p>
        )}

        <div className={styles.grade}>
          {!semSenhaAtual && (
            <div className={styles.senhaAtual}>
              <CampoSenha
                label="Senha atual"
                autoComplete="current-password"
                error={errors.senhaAtual?.message}
                {...register('senhaAtual', { required: 'Informe sua senha atual' })}
              />
            </div>
          )}
          <div className={styles.novaLinha}>
            <CampoSenha
              label="Nova senha"
              autoComplete="new-password"
              error={errors.novaSenha?.message}
              {...register('novaSenha', { validate: validarSenha })}
            />
          </div>
          <CampoSenha
            label="Confirme a nova senha"
            autoComplete="new-password"
            error={errors.confirmacao?.message}
            {...register('confirmacao', {
              validate: (valor, campos) => valor === campos.novaSenha || 'As senhas não são iguais',
            })}
          />
          {/* Ocupa a largura toda: os três requisitos cabem lado a lado */}
          <div className={styles.requisitos}>
            <span className={styles.requisitosTitulo}>A nova senha precisa ter:</span>
            <RequisitosSenha senha={novaSenha} />
          </div>
        </div>

        {erroSemCampo && <AvisoErro>{alterar.error.message}</AvisoErro>}

        <div className={styles.acoes}>
          <Button variant="outline" onClick={onCancelar} disabled={alterar.isPending}>
            Cancelar
          </Button>
          <Button type="submit" disabled={alterar.isPending}>
            {alterar.isPending ? 'Salvando…' : 'Salvar nova senha'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
