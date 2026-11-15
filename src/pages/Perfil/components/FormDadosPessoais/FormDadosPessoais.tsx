import type { BaseSyntheticEvent } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Tag } from '../../../../components/ui/Tag/Tag'
import { TextInput } from '../../../../components/ui/TextInput/TextInput'
import { validarNotaEnem, type UsuarioAtual } from '../../../../features/auth'
import { formatarDataExtenso } from '../../../../lib/utils'
import styles from './FormDadosPessoais.module.scss'

// A nota fica como texto no formulário para aceitar vírgula ("698,0");
// a conversão para número acontece só no envio.
export type CamposPerfil = {
  nome: string
  notaEnem: string
}

type FormDadosPessoaisProps = {
  id: string
  usuario: UsuarioAtual
  register: UseFormRegister<CamposPerfil>
  errors: FieldErrors<CamposPerfil>
  onSubmit: (evento?: BaseSyntheticEvent) => Promise<void>
  alterandoSenha: boolean
  onAlterarSenha: () => void
}

export function FormDadosPessoais({
  id,
  usuario,
  register,
  errors,
  onSubmit,
  alterandoSenha,
  onAlterarSenha,
}: FormDadosPessoaisProps) {
  return (
    <form id={id} className={styles.grade} onSubmit={onSubmit} noValidate>
      <TextInput
        label="Nome completo"
        type="text"
        autoComplete="name"
        error={errors.nome?.message}
        {...register('nome', {
          validate: (nome) => nome.trim().length >= 3 || 'Informe seu nome completo',
        })}
      />

      {/* O e-mail da conta não pode ser trocado (decisão do time, D-82 da API) */}
      <TextInput
        label="E-mail"
        type="email"
        value={usuario.email}
        readOnly
        className={`${styles.comAcao} ${styles.somenteLeitura}`}
        hint="O e-mail da conta não pode ser alterado."
        rightElement={
          <Tag variant={usuario.emailVerificado ? 'destaque' : 'neutro'}>
            {usuario.emailVerificado ? 'Verificado' : 'Não verificado'}
          </Tag>
        }
      />

      {/* A senha nunca vem da API: os pontos são só ilustrativos */}
      <TextInput
        label="Senha"
        type="password"
        value="********"
        readOnly
        tabIndex={-1}
        autoComplete="off"
        className={`${styles.comAcao} ${styles.somenteLeitura}`}
        hint={
          usuario.senhaAlteradaEm
            ? `Última alteração em ${formatarDataExtenso(usuario.senhaAlteradaEm, { comAno: true })}`
            : undefined
        }
        rightElement={
          // Abre o formulário de troca (FormAlterarSenha), que pede a senha atual
          <button
            type="button"
            className={styles.acaoCampo}
            onClick={onAlterarSenha}
            disabled={alterandoSenha}
            aria-expanded={alterandoSenha}
          >
            Alterar senha
          </button>
        }
      />

      <TextInput
        label="Nota do ENEM"
        type="text"
        inputMode="decimal"
        placeholder="Ex.: 698,0"
        className={styles.comAcao}
        labelAction={<span className={styles.opcional}>opcional</span>}
        rightElement={<span className={styles.sufixo}>média geral</span>}
        hint="Usamos sua nota só para estimar a sua chance nos cursos favoritos."
        error={errors.notaEnem?.message}
        {...register('notaEnem', { validate: validarNotaEnem })}
      />
    </form>
  )
}
