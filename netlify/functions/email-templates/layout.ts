export function emailLayout({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return `
  <div style="
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f4f6f8;
      padding: 40px 20px;
  ">
    <div style="
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        border-radius: 12px;
        padding: 32px;
    ">

      <h1 style="
          margin: 0 0 20px;
          font-size: 22px;
          color: #111827;
      ">
        ${title}
      </h1>

      <div style="
          font-size: 15px;
          color: #374151;
          line-height: 1.6;
      ">
        ${content}
      </div>

      <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;" />

      <p style="
          font-size: 12px;
          color: #9ca3af;
          text-align: center;
      ">
        © 2026 Optipus. All rights reserved.
      </p>
    </div>
  </div>
  `;
}