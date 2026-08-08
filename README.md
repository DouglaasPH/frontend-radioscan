# Radioscan — Frontend

Angular frontend for the RadioScan application: appointment scheduling, patient/employee management, and the workflow for uploading and tracking chest X-ray reports processed by a Deep Learning model I developed.

<br>

## Stack

- **Angular 22**
- **Angular Material** + **Angular CDK**
- **Tailwind CSS 4**
- **RxJS**
- **Vitest** + **jsdom**
- **Prettier**
- **TypeScript**

<br>

## Project Structure

```
src/app/
├── core/
│   ├── api/            -> HTTP clients by domain (mirroring API controllers)
│   │   ├── admin/
│   │   ├── appointment/
│   │   ├── auth/
│   │   ├── employee/
│   │   ├── patient/
│   │   ├── refresh-token/
│   │   └── user/
│   ├── constants/       -> API URLs, messages, roles, routes, storage keys
│   ├── guards/           -> auth.guard, guest.guard, role.guard
│   ├── interceptors/     -> auth (attaches JWT), error, loading
│   ├── models/           -> domain types (Appointment, Employee, Patient, User)
│   ├── services/         -> loading, refresh-token, storage
│   └── states/           -> session state (access-token, user, loading, etc.)
├── pages/                -> one folder per screen (see routes section)
└── shared/
├── components/       -> loading, navbar, sidebar
├── directives/       -> cpf-mask, phone-mask
├── layouts/          -> main-layout
└── utils/            -> formatDateAndHour
```

<br>

## Pages / Routes

| Page                                                                          | Likely Function                         |
| ----------------------------------------------------------------------------- | --------------------------------------- |
| `login`                                                                       | Login (email/password and Google OAuth2) |
| `create-account-patient` / `create-account-employee`                          | Patient / Employee registration         |
| `dashboard-admin` / `dashboard-employee`                                      | Role-based dashboards                   |
| `schedule-an-appointment` / `new-consultation-appointment-slot`               | Appointment scheduling                  |
| `appointment-management`                                                      | Appointment management (employee/admin) |
| `appointment-history`                                                         | Patient appointment history             |
| `view-consultation-details`                                                   | Consultation details                    |
| `exam-upload` (+ `exam-upload-main-component`, `exam-successfully-submitted`) | X-ray upload via pre-signed URL         |
| `employee-management`                                                         | Employee management (admin)             |
| `profile` / `change-password`                                                 | Account details                         |
| `terms-and-conditions`                                                        | Terms of use                            |
| `error`                                                                       | Generic error page                      |

## Prerequisites

- **Node.js** compatible with Angular 22 (recommended: the latest LTS
version available at the time)
- **npm 11.16.0** (defined in `packageManager` in `package.json` — if using
Corepack, it automatically respects this version)

Installing the Angular CLI globally is not required — the
`package.json` scripts use the `ng` version from `devDependencies` via `npx`/`npm run`.

## Installation

```bash
npm install
```

## Environment configuration

The project uses `src/app/enviroments/environment.development.ts`.

This file must point to the API. Example of what it needs to contain
(adjust to the actual format expected by `core/constants/api.constants.ts`):

```typescript
export const environment = {
production: false,
apiUrl: 'http://<alb_dns_name>', // output from terraform-radioscan: terraform output alb_dns_name
};
```

Get the actual value of `alb_dns_name` from the `terraform-radioscan` repository:

```powershell
terraform output alb_dns_name
```

## Running locally

```bash
npm start
```

This runs `ng serve`. By default, Angular starts at `http://localhost:4200`. For all site functionalities to work properly, the infrastructure must be running—please consult the infrastructure repository at: https://github.com/DouglaasPH/terraform-radioscan/blob/main/README.md

## Production build

```bash
npm run build
```

<br>

## Deployment

I created Terraform infrastructure-as-code to deploy this application. Check out the step-by-step guide at: https://github.com/DouglaasPH/terraform-radioscan/blob/main/README.md
