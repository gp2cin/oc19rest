const dotenv = require('dotenv');
dotenv.config();

const { GoogleSpreadsheet } = require('google-spreadsheet');

const StateSheet = require('./sheets/stateSheet');
const WorldSheet = require('./sheets/worldSheet');
const CountrySheet = require('./sheets/countrySheet');

async function AccessSpreadsheet() {
  //peganda a planilha usando a chave na URL
  const document = new GoogleSpreadsheet("12X2R6JxNU0pezXL-G_492V-KWIYldeOZfqZllfln4vk");

  //Autenticação
  await document.useServiceAccountAuth({
    client_email: "oc19-137@oc-19-273516.iam.gserviceaccount.com",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDb1NuJkTE0TfEr\naMIeqf/2HZFY6vFeoTMBwRi/J8zCloenJ6jpkLKKirthUg8d+sT7pfLDJKkxHS7A\nZt0PSBXPrJ/zAV2fH0p8C3KY9+yZytlNannb4c71gJ1m1/s65Pa2/RFUAvUso2Dm\nl7fRg62jym3u5nSzweD8ZRcof0lE+aZeA4hT00bmRCQaSPF2crDDzsFeRs2rF2P2\nIDCXJLJO5ffI40pP+XNUqOxxeohYkhd62WNV7rGHo29FHeaXHUGxw6LQ6wrh83bO\nhwF61W0frrbRo8arvvRsFH+XdizeZgNFPpM6vOkrl0XICUWTuZavLH54nPMomalk\nZzzEC1xxAgMBAAECggEACP8LBPQ2KUfPSNF+sDaQzQekvRjQS+kY50d5tcjxLj1u\ny75pwTU0uUq4JGFxUO7ERPAjoSzM57+j/Ce5gDiY++i6mv1BUZO8PptRU0VCH4EX\np31mA0OYbp+W0XChTWW1WwO8Q83jLrJ48rbexOo4nu1X1mEEAZ87j9irO/MJkpL5\nelLtriQy4zV8nB75ZdyakH4OkOLAFd2uHG9+CWrojp5pC/kacgBEv1tNYZzJB47F\nHTij+6q5bYqoxVPg1z2OCdIrAxqzTa/2yILNmfvk+ZlFt+lvhMwoupM2+SouShZf\n2uO2gxiTguGOJsLgJCm81+PeIF3a3l0WcMvz66OEqQKBgQDyCgjU8pqXkmD47vVo\nv2ls5MIyBNpn0KOTZKjiRAo9QIaEHzjd/+FYF9l+UFQahZD6ppczHzWt46si0g8a\nO6nolx3Ppqh2hX+ybBxmNp8Cvmy849OUtkjlKSPU71ccH2b9TZgW/6oXEV8Vya05\nK0SD885lLC+sHa+xVNOczGfvjwKBgQDogucJkMSEn0IQevjmwAIpOzIREqn3c/XS\nRnqydiOfe0kl7c2zOR4k0YS3iiFnfeGMst/COYTLG6hH3nlOQUJa4b058KKQgY6j\nsd8L0t1dEKxfwfyJ8UrFHw5MslHlxHgPlS+cOaIhYPFDoFZtGKv0/JaatTvoJLCf\nHIU9HnHz/wKBgD8QhkSWAdnEdifme2MTnLCW2lKWGSI7pqNc8vQhrllPWr1KNVMC\nvQBrFmxnGcLfUms8xOC5HQ915r1n5i97pEXKOiZE0lgvaJpguPWY/c2FOGfvJM32\nwP+UvJVa12Ooevk9Ioe7jeH80L2oks32jB+lgv2xiapbAdA+vfR4/gvZAoGBAJxz\nSIa1NKaQiuGP/V83H70iqcO3LUrmaig9aF4hBENRr5yn8NuBuXjIyma9uVBr8ZK8\n4bdNAL+yMn95gWJYow+ICc2sz5YwtwwKqazJDE6M44/jdcxT4h3VkcelzVmv46GI\nnuqeFSwkkPMSNlVeXoaQV75t6IuB9J57kGPZ0o99AoGBAOjsMcM+2hFaQjd5gcWo\nCjPQM1eRP1BgZ0VpWq9Su16WJg9o5zzdbZ77/U3bj1HFF4faw6hFOXS0yJU8Ytf9\n99nBv1mJze/v0UVwuJF6DRY+YS0W92XDTLAU9aXnBOxmCHbwVpbekmkcp/wdx2TT\nc+rksmd1bJyywCNCda4spTYE\n-----END PRIVATE KEY-----\n",
  });

  await document.loadInfo();

  //const world = await WorldSheet(document);
  //const country = await CountrySheet(document);
  const state = await StateSheet(document);
  console.log(state)
  /*
  return {
    world,
    country,
    state,
  };
  */
};

AccessSpreadsheet()

module.exports = AccessSpreadsheet;
