
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Champion } from "@/types/lol";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, slideUp, staggerContainer, staggerItem } from "@/lib/framer-animations";

const mockChampion: Champion = {
  id: "Ahri",
  key: "103",
  name: "Ahri",
  title: "the Nine-Tailed Fox",
  blurb: "Innately connected to the latent power of Runeterra, Ahri is a vastaya who can reshape magic into orbs of raw energy. She revels in toying with her prey by manipulating their emotions before devouring their life essence. Despite her predatory nature...",
  image: {
    full: "Ahri.png",
    sprite: "champion0.png",
    group: "champion",
  },
  tags: ["Mage", "Assassin"],
  stats: {
    hp: 590,
    hpperlevel: 96,
    mp: 418,
    mpperlevel: 25,
    movespeed: 330,
    armor: 21,
    armorperlevel: 4,
    spellblock: 30,
    spellblockperlevel: 1,
    attackrange: 550,
    hpregen: 5.5,
    hpregenperlevel: 0.6,
    mpregen: 8,
    mpregenperlevel: 0.8,
    crit: 0,
    critperlevel: 0,
    attackdamage: 53,
    attackdamageperlevel: 3,
    attackspeedperlevel: 2,
    attackspeed: 0.668,
  },
};

const ChampionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [champion, setChampion] = useState<Champion | null>(null);

  useEffect(() => {
    // Simulate API loading
    setLoading(true);
    
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setChampion({
        ...mockChampion,
        id: id || "Ahri",
        name: id || "Ahri",
      });
      setLoading(false);
      
      toast({
        title: "Champion loaded",
        description: `Data for ${id} has been loaded.`,
        duration: 3000,
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [id, toast]);

  return (
    <>
      <AnimatedBackground />
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/champions" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            Back to Champions
          </Link>
        </div>
        
        {loading ? (
          <div className="glass-card rounded-xl overflow-hidden">
            <Skeleton className="w-full h-[400px]" />
            <div className="p-8">
              <Skeleton className="w-48 h-6 mb-2" />
              <Skeleton className="w-96 h-12 mb-4" />
              <Skeleton className="w-full h-20" />
            </div>
          </div>
        ) : champion ? (
          <>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8"
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
                alt={champion.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={staggerItem} className="flex flex-wrap gap-2 mb-4">
                    {champion.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-lol-dark/70 text-white rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                  
                  <motion.h1 
                    variants={staggerItem}
                    className="text-4xl md:text-5xl font-bold text-white mb-2"
                  >
                    {champion.name}
                  </motion.h1>
                  
                  <motion.p 
                    variants={staggerItem}
                    className="text-xl text-gray-300 italic"
                  >
                    {champion.title}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                variants={slideUp}
                initial="hidden"
                animate="visible"
                className="md:col-span-2"
              >
                <div className="glass-card rounded-xl p-6 md:p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Champion Overview</h2>
                  <p className="text-muted-foreground">{champion.blurb}</p>
                </div>
                
                <div className="glass-card rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Abilities</h2>
                  <p className="text-muted-foreground mb-8">This section would display the champion's abilities with descriptions and videos.</p>
                  
                  <div className="grid gap-4">
                    {["Passive", "Q", "W", "E", "R"].map((ability) => (
                      <div key={ability} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-lol-dark/50 flex items-center justify-center font-bold text-white">
                          {ability}
                        </div>
                        <div>
                          <h3 className="font-bold">Ability Name</h3>
                          <p className="text-sm text-muted-foreground">
                            Ability description would go here, explaining what the ability does, damage values, cooldowns, etc.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                variants={slideUp}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <div className="glass-card rounded-xl p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-4">Statistics</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Health</span>
                        <span className="font-medium">{champion.stats.hp} (+{champion.stats.hpperlevel})</span>
                      </div>
                      <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${(champion.stats.hp / 800) * 100}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mana</span>
                        <span className="font-medium">{champion.stats.mp} (+{champion.stats.mpperlevel})</span>
                      </div>
                      <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${(champion.stats.mp / 600) * 100}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Attack Damage</span>
                        <span className="font-medium">{champion.stats.attackdamage} (+{champion.stats.attackdamageperlevel})</span>
                      </div>
                      <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: `${(champion.stats.attackdamage / 100) * 100}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Armor</span>
                        <span className="font-medium">{champion.stats.armor} (+{champion.stats.armorperlevel})</span>
                      </div>
                      <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: `${(champion.stats.armor / 50) * 100}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Magic Resist</span>
                        <span className="font-medium">{champion.stats.spellblock} (+{champion.stats.spellblockperlevel})</span>
                      </div>
                      <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: `${(champion.stats.spellblock / 50) * 100}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Move Speed</span>
                        <span className="font-medium">{champion.stats.movespeed}</span>
                      </div>
                      <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-300" style={{ width: `${(champion.stats.movespeed / 400) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-4">Recommended Builds</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    These are the most common and successful item builds for {champion.name}.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Core Items</h3>
                      <div className="flex flex-wrap gap-2">
                        {[3285, 3157, 3165].map((itemId) => (
                          <div key={itemId} className="w-12 h-12 bg-black/30 rounded-md overflow-hidden tooltip-trigger">
                            <img
                              src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${itemId}.png`}
                              alt={`Item ${itemId}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Situational Items</h3>
                      <div className="flex flex-wrap gap-2">
                        {[3089, 3135, 3116, 3135, 3116].map((itemId) => (
                          <div key={`${itemId}-${Math.random()}`} className="w-12 h-12 bg-black/30 rounded-md overflow-hidden">
                            <img
                              src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${itemId}.png`}
                              alt={`Item ${itemId}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          <div className="glass-card rounded-xl p-8 text-center">
            <p className="text-muted-foreground">Champion not found.</p>
          </div>
        )}
      </main>
    </>
  );
};

export default ChampionDetails;
