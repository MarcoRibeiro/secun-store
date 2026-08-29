import { Button, Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between gap-4 bg-white">
      <div>
        <Heading level="h2" className="txt-xlarge">
          Já tens conta?
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          Entra para uma experiência mais rápida.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10" data-testid="sign-in-button">
            Entrar
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
