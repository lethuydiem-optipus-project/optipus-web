export const emailLayout = ({ title, content }: { title: string; content: string }) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f8f6fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f6fb; padding: 40px 20px;">
      <tr>
        <td align="center">
          <div style="max-width: 600px; width: 100%; text-align: left; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #eae5f2;">
            
            <div style="background-color: #8b5cf6; padding: 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 1px;">OPTIPUS</h1>
            </div>

            <div style="padding: 40px 30px;">
              ${content}
            </div>

            <div style="background-color: #faf9fd; padding: 30px; border-top: 1px solid #eae5f2;">
              <h3 style="font-size: 14px; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; color: #8b5cf6; font-weight: 600;">Hỗ trợ khách hàng</h3>
              <p style="color: #666666; font-size: 13px; line-height: 1.6; margin-bottom: 16px;">
                Nếu gặp bất kỳ khó khăn nào trong quá trình cài đặt hoặc cần hỗ trợ thêm về dịch vụ, Quý khách đừng ngần ngại liên hệ:
              </p>
              
              <ul style="color: #555555; font-size: 13px; line-height: 1.8; padding-left: 20px; margin-bottom: 24px;">
                <li><strong>Hotline:</strong> [Số điện thoại của bạn]</li>
                <li><strong>Facebook:</strong> <a href="[Link Fanpage]" style="color: #8b5cf6; text-decoration: none; font-weight: 500;">[Link Fanpage]</a></li>
                <li><strong>TikTok:</strong> <a href="[Link kênh TikTok]" style="color: #8b5cf6; text-decoration: none; font-weight: 500;">[Link kênh TikTok]</a></li>
                <li><strong>Instagram:</strong> <a href="[Link Instagram]" style="color: #8b5cf6; text-decoration: none; font-weight: 500;">[Link Instagram]</a></li>
              </ul>
              
              <div style="border-top: 1px solid #eae5f2; padding-top: 20px; text-align: center;">
                <p style="color: #888888; font-size: 12px; margin: 0;">
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