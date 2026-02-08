import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin, Trees, Waves, Heart, Loader2 } from 'lucide-react';
import { useAuth } from '../state/auth';
import { useNavigate, useLocation } from 'react-router-dom';

export function Explore() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const res = await axios.get('/api/places');
        setPlaces(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPlaces();
  }, []);

  const handleSaveToTrip = (placeId) => {
    if (!user) {
      const redirectTo = `/trip-planner?addPlace=${placeId}`;
      navigate(`/login?redirectTo=${encodeURIComponent(redirectTo)}`, {
        state: { from: location.pathname, intentPlaceId: placeId }
      });
      return;
    }

    navigate(`/trip-planner?addPlace=${placeId}`);
  };

  const iconForType = (type) => {
    if (!type) return MapPin;
    if (type.toLowerCase().includes('forest')) return Trees;
    if (type.toLowerCase().includes('beach')) return Waves;
    return MapPin;
  };

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-safari-orange/80">Destinations</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mt-1">Explore iconic places in Kenya</h2>
          <p className="text-xs md:text-sm text-slate-300/90 mt-1">
            Scroll through curated landscapes—from city forests to coastal blues. Save the ones that call to you into a
            trip board.
          </p>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          <span className="text-sm">Loading places across Kenya...</span>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {places.map((place) => {
            const Icon = iconForType(place.category || place.name);
            return (
              <article
                key={place.id}
                className="group rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-navy-deep/90 to-black/90 overflow-hidden hover:border-safari-orange/60 hover:shadow-xl hover:shadow-safari-orange/20 transition-all"
              >
                <div className="h-40 bg-gradient-to-br from-amber-800/60 via-slate-900/80 to-black relative overflow-hidden">
                  <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity">
                    <div className="w-full h-full bg-[radial-gradient(circle_at_20%_0,_rgba(234,88,12,0.6),transparent_55%),radial-gradient(circle_at_80%_100%,_rgba(56,189,248,0.45),transparent_55%)]" />
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/70 border border-white/10">
                      <Icon className="h-4 w-4 text-safari-orange" />
                    </span>
                    <div>
                      <p className="text-[0.75rem] uppercase tracking-[0.2em] text-slate-200/90">Kenya</p>
                      <p className="text-xs text-slate-300/90">{place.region || 'Curated escape'}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="text-base font-semibold text-slate-50">{place.name}</h3>
                  <p className="text-xs text-slate-300/90 line-clamp-3">{place.description}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[0.65rem] text-slate-200">
                      <MapPin className="h-3 w-3 text-safari-orange" />
                      {place.locationLabel || 'Kenya'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSaveToTrip(place.id)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-safari-orange/60 bg-safari-orange/10 px-3 py-1.5 text-[0.7rem] font-medium text-safari-orange hover:bg-safari-orange/20 transition-colors"
                    >
                      <Heart className="h-3.5 w-3.5" />
                      Save to trip
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

