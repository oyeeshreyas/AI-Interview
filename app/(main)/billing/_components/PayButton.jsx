import { PayPalButtons } from '@paypal/react-paypal-js'
import React from 'react'

function PayButton({amount}) {
  return (
    <div>
      <PayPalButtons style={{ layout: "horizontal" }} />
    </div>
  )
}

export default PayButton
