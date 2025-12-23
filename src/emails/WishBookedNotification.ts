export const WishBookedNotification = ({ listUrl, listName }: { listUrl: string, listName: string }) => {
    const primaryColor = '#8b3dff';
    const backgroundColor = '#F4F6F8';

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Une envie a été réservée !</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1C252E;
      margin: 0;
      padding: 0;
      background-color: ${backgroundColor};
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .card {
      background-color: #ffffff;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    .emoji {
      font-size: 48px;
      margin-bottom: 24px;
      display: block;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 24px;
      color: #1C252E;
    }
    p {
      font-size: 16px;
      color: #637381;
      margin: 0 0 32px;
    }
    .highlight {
      font-weight: 600;
      color: #1C252E;
    }
    .button {
      display: inline-block;
      background-color: ${primaryColor};
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 9999px;
      font-weight: 700;
      font-size: 15px;
      transition: background-color 0.2s;
    }
    .button:hover {
      background-color: #007867;
    }
    .footer {
      margin-top: 32px;
      text-align: center;
      font-size: 12px;
      color: #919EAB;
    }
    @media only screen and (max-width: 600px) {
      .container {
        padding: 20px;
      }
      .card {
        padding: 32px 24px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <span class="emoji">🎁</span>
      
      <h1>Une envie a été réservée !</h1>
      
      <p>
        Une personne a réservé un cadeau dans votre liste <span class="highlight">${listName}</span>.
      </p>

      <a href="${listUrl}" class="button" target="_blank">
        Voir ma liste
      </a>
    </div>
    
    <div class="footer">
      <p>
        Envoyé par Envy
      </p>
    </div>
  </div>
</body>
</html>
  `;
};