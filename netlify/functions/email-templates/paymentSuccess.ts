export const paymentSuccessContent = ({
  orderCode,
  products,
}: {
  orderCode: string;
  products: { name: string; downloadUrl: string }[];
}) => {
  return `
    <p style="font-size:15px; color:#374151;">
      Đơn hàng <strong>${orderCode}</strong> đã được thanh toán thành công.
    </p>

    <div style="margin-top:20px; background:#f5f3ff; border:1px solid #e9d5ff; border-radius:10px; padding:20px;">
      
      ${products
        .map(
          (product) => `
        <div style="margin-bottom:20px;">
          <div style="font-size:16px; font-weight:600; margin-bottom:10px;">
            ${product.name}
          </div>

          <a href="${product.downloadUrl}"
             style="background:#7c3aed; color:#ffffff; text-decoration:none; padding:12px 22px; border-radius:8px; font-size:14px; display:inline-block; font-weight:600;">
            Tải xuống ngay
          </a>
        </div>
      `
        )
        .join("")}

    </div>

    <p style="margin-top:20px; font-size:13px; color:#6b7280;">
      Nếu gặp sự cố khi tải, vui lòng phản hồi email này để được hỗ trợ.
    </p>
  `;
};