interface ProductItem {
  name: string;
  downloadUrl: string;
}

export const paymentSuccessContent = ({ orderCode, products }: { orderCode: string, products: ProductItem[] }) => {
  // Tạo danh sách các dòng trong bảng sản phẩm
  const productRows = products.map(p => `
    <tr>
      <td style="padding: 16px; border-bottom: 1px solid #000000; border-right: 1px solid #000000; color: #000000; font-size: 14px; font-weight: bold;">
        ${p.name}
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #000000; font-size: 14px; text-align: right;">
        <a href="${p.downloadUrl}" style="color: #0056b3; text-decoration: underline; font-weight: bold;">Link download</a>
      </td>
    </tr>
  `).join('');

  return `
    <div>
      <p style="font-size: 16px; margin-top: 0; margin-bottom: 20px; color: #000000;"><strong>Kính gửi Quý khách,</strong></p>
      
      <p style="color: #000000; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
        Thay mặt đội ngũ <strong>OPTIPUS</strong>, xin chân thành cảm ơn Quý khách đã tin tưởng và lựa chọn sử dụng dịch vụ của chúng tôi.
      </p>
      
      <p style="color: #000000; font-size: 14px; line-height: 1.6; margin-bottom: 30px;">
        Chúng tôi xác nhận đã nhận được thanh toán thành công cho đơn hàng <strong>#${orderCode}</strong>. Dưới đây là thông tin chi tiết các sản phẩm trong đơn hàng của bạn:
      </p>

      <h3 style="font-size: 14px; margin-bottom: 16px; text-transform: uppercase; color: #000000; font-weight: bold;">Thông tin dịch vụ</h3>
      
      <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border: 1px solid #000000;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 16px; border-bottom: 1px solid #000000; border-right: 1px solid #000000; color: #000000; font-size: 13px; text-transform: uppercase; font-weight: bold;">Tên sản phẩm</th>
            <th style="text-align: right; padding: 16px; border-bottom: 1px solid #000000; color: #000000; font-size: 13px; text-transform: uppercase; font-weight: bold;">Tải xuống</th>
          </tr>
        </thead>
        <tbody>
          ${productRows}
        </tbody>
      </table>

      <p style="color: #000000; font-size: 14px; line-height: 1.6; margin-top: 30px;">
        Chúc Quý khách có những trải nghiệm tuyệt vời và quản lý tài chính hiệu quả với sản phẩm của chúng tôi!
      </p>
      
      <p style="color: #000000; font-size: 14px; line-height: 1.6; margin-top: 20px; margin-bottom: 0;">
        Trân trọng,<br><br>
        <strong>Đội ngũ OPTIPUS</strong>
      </p>
    </div>
  `;
};