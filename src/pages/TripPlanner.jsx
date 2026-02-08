import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/auth';
import { CalendarRange, Plus, MapPin, Trash2, Loader2 } from 'lucide-react';

export function TripPlanner() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [placesIndex, setPlacesIndex] = useState({});
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const params = new URLSearchParams(location.search);
  const intentPlaceId = params.get('addPlace');

  const authHeaders = () => {
    const token = localStorage.getItem('placesinkenya_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const loadData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const [plansRes, placesRes] = await Promise.all([
        axios.get('/api/trip-plans', { headers: authHeaders() }),
        axios.get('/api/places')
      ]);
      setPlans(plansRes.data);
      const index = {};
      for (const p of placesRes.data) index[p.id] = p;
      setPlacesIndex(index);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  useEffect(() => {
    if (!intentPlaceId || !user || !plans.length) return;
    const placeIdNum = Number(intentPlaceId);
    const latestPlan = plans[0];
    handleAddToPlan(latestPlan.id, placeIdNum, true);
  }, [intentPlaceId, user, plans]);

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCreating(true);
    try {
      const res = await axios.post(
        '/api/trip-plans',
        { title: newTitle.trim() },
        { headers: authHeaders() }
      );
      setPlans((prev) => [res.data, ...prev]);
      setNewTitle('');
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleAddToPlan = async (planId, placeId, fromIntent = false) => {
    try {
      const res = await axios.post(
        `/api/trip-plans/${planId}/items`,
        { placeId },
        { headers: authHeaders() }
      );
      setPlans((prev) =>
        prev.map((p) => (p.id === planId ? { ...p, items: res.data.items } : p))
      );
      if (fromIntent) {
        const url = new URL(window.location.href);
        url.searchParams.delete('addPlace');
        navigate(url.pathname + url.search, { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveItem = async (planId, itemId) => {
    try {
      const res = await axios.delete(`/api/trip-plans/${planId}/items/${itemId}`, {
        headers: authHeaders()
      });
      setPlans((prev) =>
        prev.map((p) => (p.id === planId ? { ...p, items: res.data.items } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-safari-orange/15 border border-safari-orange/50 mb-3">
            <CalendarRange className="h-5 w-5 text-safari-orange" />
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-safari-orange/80 mb-1">Trip Planner</p>
          <h2 className="text-xl font-semibold text-slate-50 mb-2">Sign in to save your ideas</h2>
          <p className="text-[0.7rem] text-slate-300 mb-4">
            The trip planner keeps your favorite places organized across devices. You can still browse freely without
            an account—this board just remembers what you love.
          </p>
          <button
            type="button"
            onClick={() =>
              navigate(`/login?redirectTo=${encodeURIComponent(location.pathname + location.search)}`)
            }
            className="inline-flex items-center justify-center gap-2 rounded-full bg-safari-orange px-4 py-2 text-xs font-medium text-white shadow-md shadow-safari-orange/40 hover:bg-safari-orange/90"
          >
            <CalendarRange className="h-3.5 w-3.5" />
            Sign in to open trip board
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <header className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-safari-orange/80">Trip Planner</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mt-1">Your Kenyan escape boards</h2>
          <p className="text-xs md:text-sm text-slate-300/90 mt-1">
            Create boards for different journeys, then save places as you explore. No bookings—just moodboards for your
            future safaris, city breaks, and coastal slow days.
          </p>
        </div>
      </header>

      <form onSubmit={handleCreatePlan} className="flex flex-wrap items-center gap-2 text-xs">
        <div className="flex-1 min-w-[180px] rounded-full border border-white/10 bg-white/5 px-3 py-1.5 flex items-center gap-2">
          <CalendarRange className="h-3.5 w-3.5 text-safari-orange" />
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Name a new trip board, e.g. 'Mara & Coast 2025'"
            className="flex-1 bg-transparent text-xs text-slate-100 placeholder:text-slate-500 outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={creating}
          className="inline-flex items-center gap-1.5 rounded-full bg-safari-orange px-3 py-1.5 text-[0.7rem] font-medium text-white shadow-md shadow-safari-orange/40 hover:bg-safari-orange/90 disabled:opacity-70"
        >
          {creating ? (
            <>
              <span className="h-3 w-3 border-2 border-white/40 border-t-transparent rounded-full animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              Add board
            </>
          )}
        </button>
      </form>

      {loading ? (
        <div className="flex items-center justify-center py-10 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          <span className="text-sm">Loading your trip boards...</span>
        </div>
      ) : plans.length === 0 ? (
        <p className="text-xs text-slate-400 border border-dashed border-white/10 rounded-xl p-4">
          No boards yet. Create one above, then head to the <span className="text-safari-orange">Explore</span> page
          and hit &quot;Save to trip&quot; on places you like.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-navy-deep to-black p-4 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-slate-50">{plan.title}</h3>
                  <p className="text-[0.7rem] text-slate-400">
                    {plan.items?.length || 0} saved {plan.items?.length === 1 ? 'spot' : 'spots'}
                  </p>
                </div>
              </div>
              <div className="space-y-2 max-h-56 overflow-auto pr-1">
                {plan.items && plan.items.length > 0 ? (
                  plan.items.map((item) => {
                    const place = placesIndex[item.placeId];
                    if (!place) return null;
                    return (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-2 rounded-xl bg-white/5 border border-white/5 px-3 py-2 text-[0.7rem]"
                      >
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/50">
                            <MapPin className="h-3.5 w-3.5 text-safari-orange" />
                          </span>
                          <div>
                            <p className="font-medium text-slate-100">{place.name}</p>
                            <p className="text-slate-400 line-clamp-2">{place.description}</p>
                            <div className="mt-1 flex flex-wrap gap-1 text-[0.65rem] text-slate-400">
                              {place.locationLabel && (
                                <span className="rounded-full bg-black/50 px-2 py-0.5">{place.locationLabel}</span>
                              )}
                              {place.region && (
                                <span className="rounded-full bg-black/50 px-2 py-0.5">{place.region}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(plan.id, item.id)}
                          className="mt-0.5 text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-[0.7rem] text-slate-500 border border-dashed border-white/10 rounded-lg px-3 py-2">
                    Empty board. Visit the <span className="text-safari-orange">Explore</span> page and save places
                    into this trip as you browse.
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
