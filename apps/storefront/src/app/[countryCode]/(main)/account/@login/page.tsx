import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Entrar",
  description: "Entra na tua conta Secunstore.",
}

export default function Login() {
  return <LoginTemplate />
}
