export const emailLayout = ({ title, content }: { title: string; content: string }) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #121212; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      
      ${content}

      <div style="margin-top: 40px;">
        <h3 style="font-size: 15px; margin-bottom: 12px; text-transform: uppercase; color: #ffffff;">Hỗ trợ khách hàng</h3>
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
          Nếu gặp bất kỳ khó khăn nào trong quá trình cài đặt hoặc cần hỗ trợ thêm về dịch vụ, Quý khách đừng ngần ngại liên hệ với chúng tôi qua các kênh sau:
        </p>
        
        <ul style="color: #cccccc; font-size: 14px; line-height: 1.8; padding-left: 20px;">
          <li><strong>Hotline:</strong> [Số điện thoại của bạn]</li>
          <li><strong>Facebook:</strong> <a href="[Link Fanpage]" style="color: #5fb0ff; text-decoration: none;">[Link Fanpage]</a></li>
          <li><strong>TikTok:</strong> <a href="[Link kênh TikTok]" style="color: #5fb0ff; text-decoration: none;">[Link kênh TikTok]</a></li>
          <li><strong>Instagram:</strong> <a href="[Link Instagram]" style="color: #5fb0ff; text-decoration: none;">[Link Instagram]</a></li>
        </ul>
        
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin-top: 24px;">
          Một lần nữa, cảm ơn Quý khách đã đồng hành cùng OPTIPUS. Chúc Quý khách có những trải nghiệm tuyệt vời và quản lý tài chính hiệu quả với sản phẩm của chúng tôi!
        </p>
        
        <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin-top: 30px;">
          Trân trọng,<br><br>
          <strong>Đội ngũ OPTIPUS</strong>
        </p>
      </div>

    </div>
  </body>
</html>
`;