export const emailLayout = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return `
  <div style="margin:0; padding:0; background:#f3f0ff; font-family:Arial, Helvetica, sans-serif;">
    
    <table align="center" width="680" cellpadding="0" cellspacing="0"
           style="margin:40px auto; background:#ffffff; border-radius:14px; overflow:hidden;">
      
      <!-- HEADER -->
      <tr>
        <td style="background:linear-gradient(135deg,#4c1d95,#7c3aed); padding:40px; text-align:center;">
          
          <img src="https://YOUR_PUBLIC_LOGO_URL"
               width="60"
               style="display:block; margin:0 auto 16px auto;" />

          <h1 style="color:#ffffff; margin:0; font-size:26px;">
            OPTIPUS
          </h1>

          <p style="color:#e9d5ff; margin-top:8px; font-size:14px;">
            Multitask like an octopus.
          </p>
        </td>
      </tr>

      <!-- BODY -->
      <tr>
        <td style="padding:40px 50px;">
          <h2 style="margin-top:0; font-size:22px; color:#4c1d95;">
            ${title}
          </h2>

          ${content}
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td style="background:#faf5ff; padding:30px; text-align:center; font-size:12px; color:#9ca3af;">
          © ${new Date().getFullYear()} Optipus
        </td>
      </tr>

    </table>
  </div>
  `;
};