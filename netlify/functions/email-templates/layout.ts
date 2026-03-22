export const emailLayout = ({ title, content }: { title: string; content: string }) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 40px 20px;">
      <tr>
        <td align="center">
          <div style="max-width: 600px; width: 100%; text-align: left; background-color: #ffffff; border-radius: 0px; border: 1px solid #000000; overflow: hidden;">
            
            <div style="padding: 30px; border-bottom: 1px solid #000000; text-align: center;">
              <h1 style="margin: 0; color: #000000; font-size: 24px; font-weight: bold; letter-spacing: 2px;">OPTIPUS</h1>
            </div>

            <div style="padding: 40px 30px;">
              ${content}
            </div>

            <div style="background-color: #ffffff; padding: 30px; border-top: 1px solid #000000;">
              <h3 style="font-size: 14px; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; color: #000000; font-weight: bold;">Hỗ trợ khách hàng</h3>
              <p style="color: #000000; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
                Nếu gặp bất kỳ khó khăn nào trong quá trình cài đặt hoặc cần hỗ trợ thêm về dịch vụ, Quý khách đừng ngần ngại liên hệ:
              </p>
              
              <ul style="color: #000000; font-size: 14px; line-height: 1.8; padding-left: 20px; margin-bottom: 24px;">
                <li><strong>Hotline:</strong> 0988971620</li>
                <li><strong>Facebook:</strong> 
                  <a href="https://www.facebook.com/optipus.vn" style="color: #000000; text-decoration: underline;">
                    facebook.com/optipus.vn
                  </a>
                </li>
                <li><strong>TikTok:</strong> 
                  <a href="https://www.tiktok.com/@optipus.notion" style="color: #000000; text-decoration: underline;">
                    tiktok.com/@optipus.notion
                  </a>
                </li>
              </ul>
              
              <div style="border-top: 1px solid #000000; padding-top: 20px; text-align: center;">
                <p style="color: #000000; font-size: 12px; margin: 0;">
                  © ${new Date().getFullYear()} OPTIPUS. All rights reserved.
                </p>
              </div>
            </div>

          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
`;