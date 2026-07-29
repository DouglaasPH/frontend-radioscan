# Radioscan — Frontend

Frontend Angular da aplicação RadioScan: agendamento de consultas, gestão de
pacientes/funcionários e o fluxo de upload/acompanhamento de laudo de raio-X
por IA.

<br>

## Repositórios relacionados

| Repositório                                                                | Descrição                                                                           |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`api-radioscan`](https://github.com/DouglaasPH/api-radioscan)             | API backend (Spring Boot / Java)                                                    |
| [`terraform-radioscan`](https://github.com/DouglaasPH/terraform-radioscan) | Infraestrutura completa (LocalStack): VPC, ALB, ECS, RDS, S3, SNS/SQS, Lambda de IA |

<br>

## Stack

- **Angular 22** (standalone components, `@angular/build` — novo builder baseado em esbuild/Vite)
- **Angular Material** + **Angular CDK**
- **Tailwind CSS 4** (via `@tailwindcss/postcss`)
- **RxJS**
- **Vitest** + **jsdom** para testes (em vez de Karma/Jasmine)
- **Prettier** para formatação
- **TypeScript**

## Estrutura do projeto

```
src/app/
├── core/
│   ├── api/            -> clientes HTTP por domínio (espelham os controllers da API)
│   │   ├── admin/
│   │   ├── appointment/
│   │   ├── auth/
│   │   ├── employee/
│   │   ├── patient/
│   │   ├── refresh-token/
│   │   └── user/
│   ├── constants/       -> URLs da API, mensagens, papéis, rotas, chaves de storage
│   ├── guards/           -> auth.guard, guest.guard, role.guard
│   ├── interceptors/     -> auth (anexa JWT), error, loading
│   ├── models/           -> tipos de domínio (Appointment, Employee, Patient, User)
│   ├── services/         -> loading, refresh-token, storage
│   └── states/           -> estado de sessão (access-token, user, loading, etc.)
├── pages/                -> uma pasta por tela (ver seção de rotas)
└── shared/
    ├── components/       -> loading, navbar, sidebar
    ├── directives/       -> cpf-mask, phone-mask
    ├── layouts/          -> main-layout
    └── utils/            -> formatDateAndHour
```

Cada pasta em `core/api/<dominio>/` corresponde 1:1 a um controller da API
(`admin` ↔ `AdminController`, `appointment` ↔ `AppointmentController`, etc.),
com os DTOs de request/response em `dto/` ao lado do client.

<br>

## Páginas / rotas

| Página                                                                        | Provável função                         |
| ----------------------------------------------------------------------------- | --------------------------------------- |
| `login`                                                                       | Login (email/senha e Google OAuth2)     |
| `create-account-patient` / `create-account-employee`                          | Cadastro de paciente / funcionário      |
| `dashboard-admin` / `dashboard-employee`                                      | Dashboards por papel                    |
| `schedule-an-appointment` / `new-consultation-appointment-slot`               | Agendamento de consulta                 |
| `appointment-management`                                                      | Gestão de consultas (funcionário/admin) |
| `appointment-history`                                                         | Histórico de consultas do paciente      |
| `view-consultation-details`                                                   | Detalhe de uma consulta                 |
| `exam-upload` (+ `exam-upload-main-component`, `exam-successfully-submitted`) | Upload do raio-X via URL pré-assinada   |
| `employee-management`                                                         | Gestão de funcionários (admin)          |
| `profile` / `change-password`                                                 | Dados da conta                          |
| `terms-and-conditions`                                                        | Termos de uso                           |
| `error`                                                                       | Página de erro genérica                 |

## Pré-requisitos

- **Node.js** compatível com Angular 22 (recomendado: a versão LTS mais
  recente disponível na época)
- **npm 11.16.0** (definido em `packageManager` no `package.json` — se usar
  Corepack, ele já respeita essa versão automaticamente)

Não é necessário instalar o Angular CLI globalmente — os scripts do
`package.json` usam o `ng` do `devDependencies` via `npx`/`npm run`.

## Instalação

```bash
npm install
```

## Configuração de ambiente

O projeto usa `src/app/enviroments/environment.development.ts`.

Esse arquivo deve apontar para a API. Exemplo do que ele precisa conter
(ajuste para o formato real que `core/constants/api.constants.ts` espera):

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://<alb_dns_name>', // saída do terraform-radioscan: terraform output alb_dns_name
};
```

Pegue o valor real do `alb_dns_name` no repositório `terraform-radioscan`:

```powershell
terraform output alb_dns_name
```

## Rodando localmente

```bash
npm start
```

Isso roda `ng serve`. Por padrão o Angular sobe em `http://localhost:4200`.
Para o login/upload funcionarem de verdade, a API (backend) e o LocalStack
precisam estar rodando — ver os READMEs dos outros dois repositórios.

## Build de produção

```bash
npm run build
```

O Angular 22 usa o builder novo (`@angular/build`), que costuma gerar a saída
em `dist/<nome-do-projeto>/browser/` (não `dist/<nome-do-projeto>/` direto
como nas versões antigas do Angular). Confirme o `outputPath` real no
`angular.json` antes do deploy — se o `terraform-radioscan/frontend_deploy/deploy.ps1`
apontar para a pasta errada, ele publica um bucket vazio/incompleto sem erro
nenhum.

## Testes

```bash
npm test
```

Roda via **Vitest** (não Karma/Jasmine), usando `jsdom` como ambiente de DOM.

## Lint / formatação

```bash
npm run format
```

Roda o Prettier em `src/**/*.{ts,html,css,scss}`.

## Deploy (S3 + CloudFront via LocalStack)

O `terraform-radioscan` já provisiona o bucket S3 do site e a distribuição
CloudFront na frente. Fluxo resumido (detalhes completos no README daquele
repositório):

1. Gere o build: `npm run build`
2. Copie `frontend_deploy/deploy.ps1` (do repo `terraform-radioscan`) para a
   raiz deste projeto
3. Rode apontando para a pasta de build real (confirme o caminho — ver aviso
   acima sobre `dist/<projeto>/browser/`):

   ```powershell
   .\deploy.ps1 -ProjectName "radioscan" -BuildDir "dist/frontend-clinic/browser"
   ```

4. Acesse pelo `website_bucket_name` ou `cloudfront_domain_name`
   (`terraform output` no repo de infraestrutura)

## Fluxo de upload de raio-X

Do lado do frontend (página `exam-upload`), o fluxo esperado é:

1. Pedir à API uma URL pré-assinada de upload (`XRayReportController` /
   `StorageGateway` no backend).
2. Fazer o `PUT` do arquivo de imagem **diretamente no S3** usando essa URL
   (não passa pela API/backend).
3. Mostrar a tela de confirmação (`exam-successfully-submitted`).
4. A partir daí, o processamento é assíncrono: o S3 dispara o pipeline
   (SNS → SQS → Lambda com IA) que atualiza o laudo no banco. O frontend
   precisa consultar/atualizar o status do laudo depois (`ProcessingStatus`
   no backend: `AWAITING_AI` → `PROCESSED_BY_IA` → `AWAITING_VALIDATION_BY_DOCTOR`
   → `VALIDATED_BY_DOCTOR`), provavelmente na tela `view-consultation-details`
   ou numa tela própria de acompanhamento do laudo.

> O bucket de imagens no LocalStack já vem com CORS liberado
> (`aws_s3_bucket_cors_configuration` no `terraform-radioscan`, métodos
> `GET/PUT/POST`, qualquer origem) — então o `PUT` direto do navegador para o
> S3 não deve esbarrar em CORS durante o desenvolvimento local.
