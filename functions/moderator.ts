import { fetch } from 'undici';

// @ts-ignore
export default async function ({ req, res }) {
  if (req.path === '/eur') {
    const amountInEuros = Number(req.query.amount);
    const response = await fetch('https://api.exchangerate.host/latest?base=EUR&symbols=USD');
    const data = await response.json();
    // @ts-ignore
      const amountInDollars = amountInEuros * data.rates.USD;
    return res.text(amountInDollars.toString());
  }

  if (req.path === '/inr') {
    const amountInRupees = Number(req.query.amount);
    const response = await fetch('https://api.exchangerate.host/latest?base=INR&symbols=USD');
    const data = await response.json();
    // @ts-ignore
      const amountInDollars = amountInRupees * data.rates.USD;
    return res.text(amountInDollars.toString());
  }

  return res.text('Invalid path');
};
