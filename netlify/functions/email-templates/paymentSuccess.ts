export function paymentSuccessContent({
  orderCode,
  products,
}: {
  orderCode: string;
  products: { name: string; downloadUrl: string }[];
}) {
  const productList = products
    .map(
      (p) => `
        <div style="
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 16px;
        ">
          <strong style="display:block; margin-bottom:8px;">
            ${p.name}
          </strong>

          <a href="${p.downloadUrl}" 
             style="
                display:inline-block;
                padding:10px 16px;
                background:#2563eb;
                color:white;
                text-decoration:none;
                border-radius:6px;
                font-size:14px;
             ">
             Tải xuống
          </a>
        </div>
      `
    )
    .join("");

  return `
    <p>
      Thanh toán của bạn đã được xác nhận thành công 🎉
    </p>

    <p>
      <strong>Mã đơn:</strong> ${orderCode}
    </p>

    <div style="margin-top:20px;">
      ${productList}
    </div>

    <p style="margin-top:20px;">
      Nếu bạn gặp vấn đề khi tải xuống, hãy phản hồi email này để được hỗ trợ.
    </p>
  `;
}