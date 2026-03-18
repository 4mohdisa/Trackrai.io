import { Check, Minus } from 'lucide-react'

const ROWS = [
  {
    feature: 'AI transaction categorisation',
    spreadsheets: false, ynab: false, mint: true, trackrai: true,
  },
  {
    feature: 'No bank login required',
    spreadsheets: true, ynab: false, mint: false, trackrai: true,
  },
  {
    feature: 'Merchant tracking',
    spreadsheets: false, ynab: false, mint: true, trackrai: true,
  },
  {
    feature: 'Recurring transaction automation',
    spreadsheets: false, ynab: true, mint: true, trackrai: true,
  },
  {
    feature: 'Financial reports and exports',
    spreadsheets: true, ynab: true, mint: false, trackrai: true,
  },
  {
    feature: 'Mobile and web app',
    spreadsheets: false, ynab: true, mint: true, trackrai: true,
  },
  {
    feature: 'Free to use',
    spreadsheets: true, ynab: false, mint: false, trackrai: true,
  },
  {
    feature: 'Row-level data security',
    spreadsheets: false, ynab: false, mint: false, trackrai: true,
  },
]

const COLUMNS = [
  { key: 'spreadsheets', label: 'Spreadsheets', highlight: false },
  { key: 'ynab',         label: 'YNAB',         highlight: false },
  { key: 'mint',         label: 'Mint',         highlight: false },
  { key: 'trackrai',     label: 'TrackrAI',     highlight: true },
] as const

type ColKey = (typeof COLUMNS)[number]['key']

function Cell({ value, highlight }: { value: boolean; highlight: boolean }) {
  if (value) {
    return highlight ? (
      <td className="px-4 py-4 text-center bg-[#635BFF]/5">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#635BFF] shadow-sm">
          <Check className="h-4 w-4 text-white" strokeWidth={3} />
        </span>
      </td>
    ) : (
      <td className="px-4 py-4 text-center">
        <Check className="h-5 w-5 text-gray-400 mx-auto" />
      </td>
    )
  }
  return highlight ? (
    <td className="px-4 py-4 text-center bg-[#635BFF]/5">
      <Minus className="h-5 w-5 text-gray-300 mx-auto" />
    </td>
  ) : (
    <td className="px-4 py-4 text-center">
      <Minus className="h-5 w-5 text-gray-200 mx-auto" />
    </td>
  )
}

export function ComparisonTable() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-[#635BFF]/10 px-4 py-1.5 text-sm font-medium text-[#635BFF] mb-5">
            Comparison
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-5">
            See how TrackrAI compares
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            TrackrAI gives you AI categorisation and full privacy without a monthly subscription.
          </p>
        </div>

        {/* Table — scrollable on mobile */}
        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full min-w-[620px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left font-semibold text-gray-600 w-1/3">Feature</th>
                {COLUMNS.map(({ key, label, highlight }) => (
                  <th
                    key={key}
                    className={`px-4 py-4 text-center font-bold text-sm ${
                      highlight
                        ? 'bg-[#635BFF] text-white rounded-t-lg'
                        : 'text-gray-600'
                    }`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-gray-50 last:border-0 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  } hover:bg-[#635BFF]/3 transition-colors`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                  {COLUMNS.map(({ key, highlight }) => (
                    <Cell
                      key={key}
                      value={row[key as ColKey] as boolean}
                      highlight={highlight}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-sm text-gray-400 mt-5">
          Comparison based on publicly available information. Accurate as of March 2026.
        </p>
      </div>
    </section>
  )
}
