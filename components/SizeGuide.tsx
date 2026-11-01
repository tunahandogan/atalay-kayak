import { bootSizes, skiLengthRule } from "@/content/business";

export function SizeGuide() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h3 className="font-display text-xl font-extrabold text-ink">Bot numarası (EU ↔ Mondopoint)</h3>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-white">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Ayakkabı numarası ile kayak botu Mondopoint karşılığı</caption>
            <thead className="bg-glacier-2 text-ink">
              <tr>
                <th scope="col" className="px-4 py-3 font-bold">Ayakkabı (EU)</th>
                <th scope="col" className="px-4 py-3 font-bold">Mondopoint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {bootSizes.map((b) => (
                <tr key={b.eu}>
                  <th scope="row" className="px-4 py-2.5 font-medium text-ink">{b.eu}</th>
                  <td className="px-4 py-2.5 text-muted">{b.mondo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 className="font-display text-xl font-extrabold text-ink">Kayak boyu</h3>
        <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-white">
          {skiLengthRule.map((r) => (
            <li key={r.level} className="px-4 py-3">
              <p className="font-bold text-ink">{r.level}</p>
              <p className="text-sm text-muted">{r.rule}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl bg-glacier-2 p-4 text-sm text-ink">
          Genel bilgi; bot ve kayak boyu mağazada denenerek netleşir. Numaranızı bilmiyorsanız sorun olmaz.
        </p>
      </div>
    </div>
  );
}
