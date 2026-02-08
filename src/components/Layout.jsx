import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MapPinned, MapPin } from 'lucide-react';

const navLinkClasses =
  'px-3 py-1.5 rounded-full text-sm font-medium transition-colors hover:bg-safari-orange/10 hover:text-safari-orange';

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-navy-deep to-black text-slate-50">
      <header className="sticky top-0 z-30 backdrop-blur bg-black/40 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-safari-orange to-amber-500 flex items-center justify-center shadow-md shadow-safari-orange/40">
              <MapPin className="h-5 w-5 text-black" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs uppercase tracking-[0.25em] text-safari-orange">PlacesInKenya</span>
              <span className="text-sm text-slate-300">Curated escapes across Kenya</span>
            </div>
          </Link>
          <nav className="flex items-center gap-1">
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? 'bg-safari-orange/20 text-safari-orange' : 'text-slate-300'}`
              }
            >
              Explore
            </NavLink>
            <NavLink
              to="/operators"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? 'bg-safari-orange/20 text-safari-orange' : 'text-slate-300'}`
              }
            >
              Tour Operators
            </NavLink>
            <NavLink
              to="/trip-planner"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? 'bg-safari-orange/20 text-safari-orange' : 'text-slate-300'}`
              }
            >
              Trip Planner
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      <footer className="border-t border-white/5 mt-12 py-6 text-xs text-slate-500 text-center">
        <div className="flex items-center justify-center gap-1 mb-2 text-slate-400">
          <MapPinned className="h-4 w-4 text-safari-orange" />
          <span>Cinematic journeys across Kenya</span>
        </div>
        <p>© {new Date().getFullYear()} PlacesInKenya. Built for exploration, not booking.</p>
      </footer>
    </div>
  );
}
