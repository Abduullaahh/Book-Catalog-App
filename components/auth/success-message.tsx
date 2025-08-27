import { CheckCircle } from "lucide-react"

export function SuccessMessage() {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="font-semibold text-foreground mb-2">Registration Successful!</h3>
      <p className="text-muted-foreground">
        Your account has been created. You can now sign in with your credentials.
      </p>
    </div>
  )
}
