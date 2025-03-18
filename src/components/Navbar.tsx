
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, slideDown } from "@/lib/framer-animations";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [summonerName, setSummonerName] = useState("");
  const [region, setRegion] = useState("na1");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (summonerName.trim()) {
      navigate(`/summoner/${region}/${summonerName}`);
    }
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 glass-card py-4 px-6"
      variants={slideDown}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-8"
          variants={fadeIn}
        >
          <Link to="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-lol-blue" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0H24V32H8V0Z" fill="currentColor"/>
              <path d="M0 8H8V24H0V8Z" fill="currentColor"/>
              <path d="M24 8H32V24H24V8Z" fill="currentColor"/>
            </svg>
            <span className="text-xl font-display font-medium">
              <span className="text-lol-blue">LoL</span> API Guru
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-sm font-medium transition-all hover:text-lol-blue">
              Home
            </Link>
            <Link to="/champions" className="text-sm font-medium transition-all hover:text-lol-blue">
              Champions
            </Link>
          </nav>
        </motion.div>

        <motion.form 
          onSubmit={handleSearch}
          className="relative w-full max-w-md"
          variants={fadeIn}
        >
          <div className="flex">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="glass-input rounded-l-lg py-2 px-3 text-sm w-20 focus:outline-none"
            >
              <option value="na1">NA</option>
              <option value="euw1">EUW</option>
              <option value="eun1">EUNE</option>
              <option value="kr">KR</option>
              <option value="jp1">JP</option>
            </select>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search summoner..."
                value={summonerName}
                onChange={(e) => setSummonerName(e.target.value)}
                className="glass-input rounded-r-lg py-2 pl-3 pr-10 text-sm w-full focus:outline-none"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Search size={18} className="text-muted-foreground hover:text-lol-blue transition-colors" />
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </motion.header>
  );
};

export default Navbar;
