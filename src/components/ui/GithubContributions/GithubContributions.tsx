import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { SectionHeading } from '../SectionHeading/SectionHeading';

interface GithubContributionsProps {
  username?: string;
}

const GITHUB_DOCS_URL = 'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-graphs-on-your-profile/viewing-contributions-on-your-profile';

const CALENDAR_THEME = {
  light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

const skeletonTiles = Array.from({ length: 42 }, (_, index) => index);

export const GithubContributions = ({ username = 'habibi58' }: GithubContributionsProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const timer = window.setTimeout(() => {
      if (!active) return;
      setIsLoading(false);
    }, 600);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full pt-24 sm:pt-28 md:pt-32">
      <div className="mb-10">
        <SectionHeading
          title="GitHub Activity"
          align="center"
        />
      </div>

      <div
        className="rounded-[26px] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.42)] sm:p-7"
        style={{
          background: 'rgba(8, 8, 10, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.09)',
          backdropFilter: 'blur(18px) saturate(125%)',
          WebkitBackdropFilter: 'blur(18px) saturate(125%)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <p className="mb-4 text-center text-sm text-slate-400 leading-relaxed">
          Recent contributions and development activity across the projects I build and maintain
        </p>

        <div className="mb-4 flex items-center justify-end gap-3">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-[#7dd3fc] transition hover:text-[#a5f3fc]"
          >
            @{username}
          </a>
        </div>

        {isLoading ? (
        <div className="w-full overflow-x-auto pb-2">
          <div className="min-w-[760px]">
            <div className="mb-3 flex items-center justify-end gap-2 text-[10px] text-slate-400">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className="h-2.5 w-2.5 rounded-[2px] border border-white/5"
                    style={{
                      backgroundColor: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'][level],
                    }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
            <div className="grid grid-cols-7 gap-[3px]" style={{ width: '760px' }}>
              {skeletonTiles.map((tile) => (
                <div
                  key={tile}
                  className="h-[10px] w-[10px] animate-pulse rounded-[2px] border border-white/5 bg-slate-800"
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[760px]">
            <GitHubCalendar
              username={username}
              throwOnError={false}
              errorMessage="GitHub contribution data is temporarily unavailable. Check back soon or visit my GitHub profile."
              showColorLegend={true}
              showMonthLabels={true}
              showTotalCount={false}
              showWeekdayLabels={['mon', 'wed', 'fri']}
              fontSize={11}
              blockSize={12}
              blockMargin={4}
              colorScheme="dark"
              theme={CALENDAR_THEME}
              labels={{
                legend: { less: 'Less', more: 'More' },
                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              }}
            />

            <div className="mt-3 flex items-center justify-end gap-2 text-[10px] text-slate-400">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className="h-2.5 w-2.5 rounded-[2px] border border-white/5"
                    style={{
                      backgroundColor: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'][level],
                    }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>

            <div className="mt-3 text-right text-[10px] text-slate-400">
              <a
                href={GITHUB_DOCS_URL}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-slate-200"
              >
                Learn how we count contributions
              </a>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default GithubContributions;
