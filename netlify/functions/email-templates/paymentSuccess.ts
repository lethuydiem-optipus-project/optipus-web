interface ProductItem {
  name: string;
  downloadUrl?: string; // Có thể không dùng tới nếu bạn fix cứng link YouTube
}

export const paymentSuccessContent = ({ orderCode, products }: { orderCode: string, products: ProductItem[] }) => {
  // Tạo danh sách các dòng trong bảng sản phẩm
  const productRows = products.map(p => `
    <tr>
      <td style="padding: 16px; border-bottom: 1px solid #333333; color: #ffffff; font-size: 14px; font-weight: 500;">
        ${p.name}
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #333333; font-size: 14px;">
        <a href="https://www.youtube.com" style="color: #5fb0ff; text-decoration: underline;">Link download</a>
      </td>
    </tr>
  `).join('');

  return `
    <div>
      <p style="font-size: 16px; margin-bottom: 20px; color: #ffffff;"><strong>Kính gửi Quý khách,</strong></p>
      
      <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
        Thay mặt đội ngũ OPTIPUS, xin chân thành cảm ơn Quý khách đã tin tưởng và lựa chọn sử dụng dịch vụ của chúng tôi.
      </p>
      
      <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin-bottom: 30px;">
        Chúng tôi xác nhận đã nhận được thanh toán thành công cho đơn hàng <strong>#${orderCode}</strong>. Dưới đây là thông tin chi tiết các sản phẩm trong đơn hàng của bạn:
      </p>

      <h3 style="font-size: 15px; margin-bottom: 16px; text-transform: uppercase; color: #ffffff;">Thông tin dịch vụ</h3>
      
      <table style="width: 100%; border-collapse: collapse; background-color: #1a1a1a; border-radius: 8px; overflow: hidden; border: 1px solid #333333;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 16px; border-bottom: 1px solid #333333; color: #cccccc; font-size: 14px; font-weight: normal;">Tên sản phẩm</th>
            <th style="text-align: left; padding: 16px; border-bottom: 1px solid #333333; color: #cccccc; font-size: 14px; font-weight: normal;">Tải xuống</th>
          </tr>
        </thead>
        <tbody>
          ${productRows}
        </tbody>
      </table>
    </div>
  `;
};