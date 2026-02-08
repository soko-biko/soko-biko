import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, User2, MapPin, Phone, Globe, Filter, Loader2 } from 'lucide-react';

const FILTERS = [
  { id: 'all', label: 'All operators' },
  { id: 'COMPANY', label: 'Companies only' },
  { id: 'INDIVIDUAL', label: 'Individual guides' }
];

export function Operators() {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function fetchOperators() {
      try {
        const res = await axios.get('/api/tour-operators');
        setOperators(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOperators();
  }, []);

  const filtered = operators.filter((op) => (filter === 'all' ? true : op.type === filter));

  return (
    <section className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-safari-orange/80">Tour Operators</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mt-1">Find companies & local guides</h2>
          <p className="text-xs md:text-sm text-slate-300/90 mt-1 max-w-md">
            Browse a directory of Kenyan tour companies and independent guides. Reach out to them directly to bring
            your trip ideas to life—PlacesInKenya doesn&apos;t handle booking or payments.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[0.65rem] text-slate-400">
            <Filter className="h-3 w-3" />
            Filter by operator type
          </span>
          <div className="flex rounded-full bg-white/5 border border-white/10 p-0.5 text-[0.65rem]">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1 rounded-full transition-colors ${
                  filter === f.id
                    ? 'bg-safari-orange text-white shadow-sm shadow-safari-orange/40'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          <span className="text-sm">Fetching trusted operators...</span>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((op) => (
            <article
              key={op.id}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-navy-deep to-black p-4 flex flex-col justify-between hover:border-safari-orange/60 hover:shadow-xl hover:shadow-safari-orange/20 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-safari-orange/15 border border-safari-orange/50">
                    {op.type === 'COMPANY' ? (
                      <Users className="h-4 w-4 text-safari-orange" />
                    ) : (
                      <User2 className="h-4 w-4 text-safari-orange" />
                    )}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm md:text-base font-semibold text-slate-50">{op.name}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[0.65rem] text-slate-200">
                      {op.type === 'COMPANY' ? 'Company' : 'Individual guide'}
                    </span>
                  </div>
                  <p className="text-[0.7rem] text-slate-300/90 mb-2">{op.description}</p>
                  <div className="flex flex-wrap gap-2 text-[0.65rem] text-slate-300/90">
                    {op.baseLocation && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1">
                        <MapPin className="h-3 w-3 text-safari-orange" />
                        {op.baseLocation}
                      </span>
                    )}
                    {op.focusRegion && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1">
                        <Globe className="h-3 w-3 text-sky-400" />
                        {op.focusRegion}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[0.7rem] text-slate-300/90">
                <span className="flex items-center gap-1 text-slate-400">
                  <Phone className="h-3 w-3 text-emerald-400" />
                  Reach out directly to discuss your ideas.
                </span>
                <span className="text-[0.65rem] text-slate-500">No payments via PlacesInKenya.</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

