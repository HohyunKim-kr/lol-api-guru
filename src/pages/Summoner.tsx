
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Summoner, Match, ChampionMastery } from "@/types/lol";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import SummonerProfile from "@/components/SummonerProfile";
import MatchHistory from "@/components/MatchHistory";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for Summoner profile
const mockSummoner: Summoner = {
  id: "abc123",
  accountId: "123abc",
  puuid: "puuid123",
  name: "SummonerName",
  profileIconId: 4644,
  revisionDate: Date.now(),
  summonerLevel: 150
};

// Mock data for Match history
const mockMatches: Match[] = [
  {
    metadata: {
      matchId: "match1",
      participants: ["puuid123"]
    },
    info: {
      gameCreation: Date.now() - 3600000,
      gameDuration: 1800,
      gameMode: "CLASSIC",
      participants: [
        {
          assists: 10,
          championId: 103,
          championName: "Ahri",
          deaths: 3,
          kills: 8,
          item0: 3020,
          item1: 3157,
          item2: 3165,
          item3: 3089,
          item4: 3135,
          item5: 3116,
          item6: 3340,
          summoner1Id: 4,
          summoner2Id: 14,
          summonerName: "SummonerName",
          teamId: 100,
          win: true,
          totalDamageDealtToChampions: 24500,
          goldEarned: 14200,
          visionScore: 28
        }
      ],
      teams: [
        {
          teamId: 100,
          win: true,
          objectives: {
            baron: { first: true, kills: 1 },
            champion: { first: true, kills: 25 },
            dragon: { first: true, kills: 3 },
            inhibitor: { first: false, kills: 1 },
            riftHerald: { first: true, kills: 2 },
            tower: { first: true, kills: 8 }
          }
        },
        {
          teamId: 200,
          win: false,
          objectives: {
            baron: { first: false, kills: 0 },
            champion: { first: false, kills: 15 },
            dragon: { first: false, kills: 1 },
            inhibitor: { first: false, kills: 0 },
            riftHerald: { first: false, kills: 0 },
            tower: { first: false, kills: 3 }
          }
        }
      ]
    }
  },
  {
    metadata: {
      matchId: "match2",
      participants: ["puuid123"]
    },
    info: {
      gameCreation: Date.now() - 86400000,
      gameDuration: 2100,
      gameMode: "ARAM",
      participants: [
        {
          assists: 15,
          championId: 99,
          championName: "Lux",
          deaths: 5,
          kills: 12,
          item0: 3285,
          item1: 3116,
          item2: 3157,
          item3: 3089,
          item4: 3135,
          item5: 3165,
          item6: 3364,
          summoner1Id: 4,
          summoner2Id: 14,
          summonerName: "SummonerName",
          teamId: 100,
          win: false,
          totalDamageDealtToChampions: 52000,
          goldEarned: 18500,
          visionScore: 15
        }
      ],
      teams: [
        {
          teamId: 100,
          win: false,
          objectives: {
            baron: { first: false, kills: 0 },
            champion: { first: false, kills: 35 },
            dragon: { first: false, kills: 0 },
            inhibitor: { first: false, kills: 0 },
            riftHerald: { first: false, kills: 0 },
            tower: { first: false, kills: 2 }
          }
        },
        {
          teamId: 200,
          win: true,
          objectives: {
            baron: { first: false, kills: 0 },
            champion: { first: true, kills: 45 },
            dragon: { first: false, kills: 0 },
            inhibitor: { first: true, kills: 1 },
            riftHerald: { first: false, kills: 0 },
            tower: { first: true, kills: 5 }
          }
        }
      ]
    }
  }
];

const SummonerPage = () => {
  const { region, name } = useParams<{ region: string; name: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [summoner, setSummoner] = useState<Summoner | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    // Simulate API loading
    setLoading(true);
    
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setSummoner(mockSummoner);
      setMatches(mockMatches);
      setLoading(false);
      
      toast({
        title: "Data loaded",
        description: `Summoner data for ${name} has been loaded.`,
        duration: 3000,
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [name, region, toast]);

  return (
    <>
      <AnimatedBackground />
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
        
        {loading ? (
          <>
            <div className="glass-card rounded-xl overflow-hidden mb-8">
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <Skeleton className="w-32 h-32 rounded-xl" />
                  <div className="flex-1">
                    <Skeleton className="w-24 h-4 mb-2" />
                    <Skeleton className="w-48 h-10 mb-4" />
                    <Skeleton className="w-64 h-4 mb-8" />
                    <div className="flex gap-4">
                      <Skeleton className="w-16 h-16" />
                      <Skeleton className="w-16 h-16" />
                      <Skeleton className="w-16 h-16" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <Skeleton className="w-48 h-8 mb-4" />
              {[1, 2, 3].map((_, i) => (
                <Skeleton key={i} className="w-full h-28 mb-4" />
              ))}
            </div>
          </>
        ) : (
          <>
            {summoner && <SummonerProfile summoner={summoner} />}
            
            <div className="mt-12">
              {name && matches.length > 0 && (
                <MatchHistory matches={matches} summonerName={name} />
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default SummonerPage;
