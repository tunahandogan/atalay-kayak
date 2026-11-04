import { bootSizes, skiLengthRule } from "@/content/business";

export function SizeGuide() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div>
        <h3 className="display text-[clamp(2rem,1.6rem+1.6vw,3rem)]">Bot numarası</h3>
        <table className="mt-5 w-full bg-paper text-left">
          <caption className="sr-only">Ayakkabı numarası ile kayak botu Mondopoint karşılığı</caption>
          <thead className="bg-night text-paper">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Ayakkabı (EU)</th>
              <th scope="col" className="px-4 py-3 font-semibold">Mondopoint</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line"> {/* taste-skill-ignore: gerçek tablo satırları */}
            {bootSizes.map((b) => (
              <tr key={b.eu}>
                <th scope="row" className="px-4 py-2.5 font-semibold">{b.eu}</th>
                <td className="px-4 py-2.5 tabular-nums">{b.mondo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="display text-[clamp(2rem,1.6rem+1.6vw,3rem)]">Kayak boyu</h3>
        <ul className="mt-5 grid gap-6">
          {skiLengthRule.map((r) => (
            <li key={r.level}>
              <p className="font-semibold">{r.level}</p>
              <p className="text-lead">{r.rule}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[52ch]">
          Genel bilgi; bot ve kayak boyu mağazada denenerek netleşir. Numaranızı bilmiyorsanız sorun olmaz.
        </p>
      </div>
    </div>
  );
}
