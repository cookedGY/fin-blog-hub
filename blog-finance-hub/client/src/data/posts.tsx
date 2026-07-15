import React from "react";
import { Link } from "wouter";

import DataCenterMap from '@/components/DataCenterMap';

export interface Post {
  slug: string;
  tag: string;
  title: string;
  date: string;
  description?: string;
  thumbnail?: string;
  content: React.ReactNode;
  seoKeywords?: string[];
  seoDescription?: string;
}

export const POSTS: Record<string, Post> = {
  "taking-reins-cloned-website-harvard-python": {
    slug: "taking-reins-cloned-website-harvard-python",
    tag: "Finance Grind",
    title: "Taking the Reins: Why I Cloned My Website Locally and Enrolled in Harvard Python",
    date: "July 14, 2026",
    description: "I started with AI-built portfolio sites. Now I am learning Git, databases, and Python so I can understand the code behind my finance projects.",
    seoKeywords: ["finance portfolio website", "GitHub Desktop beginner", "Harvard Python course", "finance student coding", "AI website builder", "Manus AI portfolio", "Iomega Corporation analysis", "Wayback Machine financial data", "low code to developer", "Python for finance"],
    seoDescription: "After using Manus AI to build a finance portfolio site, I cloned the repo locally, started learning Git and databases, and enrolled in Harvard's introductory Python course to move from AI prompting to hands-on development.",
    content: (
      <>
        <p>If you have been following my journey, you know I have been building out a digital portfolio to showcase my finance projects. For my recent analysis of the now-defunct <strong>Iomega Corporation</strong>, I had to travel back in time using the Wayback Machine, scrape historical 1999 financial data, and run it through a custom scanner.</p>
        <p>To host these insights, I used <strong>Manus AI</strong> to quickly spin up a series of project sites, tying them all together with a central blog portfolio. It was incredibly fast, and the UI was intuitive. Even my software engineering mentor complimented the design.</p>
        <p>But as my mentor rightly pointed out during our last sync: <strong>Using AI to build a site is one thing; truly understanding <em>why</em> the code works is another.</strong></p>
        <p>That piece of advice changed my entire approach. This week, I decided to take the training wheels off. Here is how I am transitioning from a no-code prompt engineer to a hands-on developer.</p>

        <h2>Step 1: Taking Control of the Infrastructure</h2>
        <p>When you rely entirely on an AI platform's interface to deploy your site, you are locked into its sandbox. I wanted to be able to write, edit, and push updates directly from my computer.</p>
        <p>To do that, I needed to connect my website to <strong>GitHub</strong> and clone the repository locally.</p>
        <p>I will admit, I tried tackling this through the command-line terminal first. As a finance major, staring at a blank terminal while trying to authenticate and clone directories was a steep learning curve, and I hit a few roadblocks. Instead of throwing in the towel, I adapted.</p>
        <ul>
          <li>I downloaded <strong>GitHub Desktop</strong>.</li>
          <li>I used it to visually manage authentication and sync my online repository.</li>
          <li>I successfully cloned the codebase directly to my local machine.</li>
        </ul>
        <p>Now, instead of waiting on the Manus web editor, I can manage and push my code updates more seamlessly.</p>

        <h2>Step 2: Demystifying the Database</h2>
        <p>As I began planning new features for this blog, including the ability to upload custom images alongside my posts, the AI kept prompting me with the same message: <em>To do this, you need to set up a database.</em></p>
        <p>In finance, we look at completed datasets all the time. But building a database to house and structure data in real time is a completely different beast.</p>
        <p>Mapping out how my blog posts, image file paths, and metadata will talk to each other is my next big technical milestone, and I am genuinely excited to sketch out my first schema.</p>

        <h2>Step 3: Going Back to School, Virtually</h2>
        <p>You cannot fully understand the why behind your code if you do not know the language.</p>
        <p>To bridge the gap between prompting an AI and actually speaking the language of logic, I have officially enrolled in <strong>Harvard University's introductory Python course</strong>.</p>
        <p>My goal is not just to make things that work. It is to write clean, intentional code, understand object-oriented programming, and bring a rigorous engineering mindset to the financial data analysis I love doing.</p>

        <h2>The Road Ahead</h2>
        <p>Bridging finance and software engineering is not about discarding one for the other. It is about combining them.</p>
        <p>Understanding how a business operates financially, paired with the ability to build the actual tools that analyze its data, is a powerful combination.</p>
        <p>There will be more bugs to squash, more command-line battles to fight, and plenty of Python syntax to memorize. But for the first time, I am the one writing the map.</p>
        <p><em>Have you ever made the transition from low-code tools to manual development? Let's connect in the comments or on LinkedIn.</em></p>
      </>
    )
  },
  "maritime-insurance": {
    slug: "maritime-insurance",
    tag: "Finance Grind",
    title: "Could the U.S. Replace Lloyd's of London in Maritime Insurance?",
    date: "March 6, 2026",
    description: "War, trade tensions, and geopolitical risk are reshaping global insurance markets. Could governments step in to replace private insurers like Lloyd's of London?",
    seoKeywords: ["maritime insurance explained", "Lloyd's of London war risk", "US government shipping insurance", "geopolitical risk insurance", "war risk insurance 2026", "global trade disruption", "shipping insurance crisis", "Red Sea insurance", "marine insurance finance", "insurance markets geopolitics"],
    seoDescription: "War, sanctions, and trade tensions are forcing a reckoning in global maritime insurance. Could the U.S. government step in to replace Lloyd's of London as the insurer of last resort? A finance perspective on shipping risk, war exclusions, and what it means for global trade.",
    thumbnail: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195299521/m9pkVfcN4EvvpQY2WF9XoU/thumbnail-maritime-insurance-kz6wrU4K548a7uLXEzphyC.webp",
    content: (
      <>
        <p>The global economy runs on ships.</p>
        <p>About 80-90% of world trade moves by sea. Oil, grain, electronics, cars: if it crosses oceans, it usually travels on a vessel insured by a complex network of underwriters.</p>
        <p>For centuries, the center of that network has been Lloyd's of London, the world's most famous insurance marketplace.</p>
        <p>But recent geopolitical tensions have raised an unusual question:</p>
        <p>What happens when war makes shipping too risky for private insurers?</p>
        <p>And more interestingly, could governments step in and replace them?</p>
        <h2>Why Marine Insurance Exists in the First Place</h2>
        <p>Shipping has always been dangerous.</p>
        <p>Storms sink vessels. Pirates hijack cargo. Accidents happen in crowded ports. And sometimes, geopolitical conflicts turn shipping lanes into military flashpoints.</p>
        <p>Marine insurance exists to protect against those risks.</p>
        <p>Here's how the system usually works:</p>
        <ul>
          <li>Shipping companies buy insurance through brokers like Aon or Marsh.</li>
          <li>Those brokers place the risk with underwriters, often within the Lloyd's marketplace.</li>
          <li>Multiple insurers share the risk across syndicates.</li>
        </ul>
        <p>This structure spreads catastrophic risk across many participants.</p>
        <p>Most of the time, it works beautifully.</p>
        <p>Until war enters the picture.</p>
        <h2>When War Breaks the Insurance Market</h2>
        <p>War introduces a problem insurers hate: uncertainty that can't be priced properly.</p>
        <p>If missiles are flying near shipping routes or if governments might seize cargo, insurers struggle to calculate potential losses.</p>
        <p>So one of two things happens:</p>
        <ul>
          <li>Insurance premiums skyrocket.</li>
          <li>Or insurers withdraw coverage entirely.</li>
        </ul>
        <p>When that happens, global trade faces a serious problem.</p>
        <p>Ships cannot legally enter many ports without insurance.</p>
        <p>No insurance means no shipping. No shipping means supply chain shock.</p>
        <p>That's where governments sometimes step in.</p>
        <h2>Governments as the Insurer of Last Resort</h2>
        <p>History shows that when private markets pull back, states occasionally fill the gap.</p>
        <p>During World War II, governments provided war-risk insurance to keep trade moving.</p>
        <p>After the September 11 attacks, governments supported aviation insurance markets when private insurers withdrew coverage.</p>
        <p>The idea is simple: Trade must continue, even when risk becomes extreme.</p>
        <p>In those moments, governments act as a temporary insurer of last resort.</p>
        <h2>Could the United States Do the Same for Shipping?</h2>
        <p>In theory, yes.</p>
        <p>If geopolitical tensions disrupted major shipping lanes, such as the Persian Gulf or key Asian trade routes, the U.S. government could create a program offering war-risk insurance or guarantees for cargo shipments.</p>
        <p>Such a system might involve:</p>
        <ul>
          <li>Government-backed insurance facilities</li>
          <li>Risk-sharing with private insurers</li>
          <li>Guarantees to shipping companies</li>
          <li>Coordination with financial institutions</li>
        </ul>
        <p>The goal would not be to permanently replace Lloyd's.</p>
        <p>It would be to stabilize trade during periods when private markets become too risk-averse.</p>
        <h2>What Happens to Companies Like Aon?</h2>
        <p>Interestingly, brokers like Aon probably wouldn't disappear.</p>
        <p>In fact, they might become even more important.</p>
        <p>Insurance brokers don't usually carry the risk themselves; they structure deals between clients and capital providers.</p>
        <p>If governments became part of the system, brokers would likely:</p>
        <ul>
          <li>Structure policies</li>
          <li>Coordinate coverage layers</li>
          <li>Place risk between governments and private insurers</li>
          <li>Advise shipping clients</li>
        </ul>
        <p>In other words, brokers remain the architects of the system.</p>
        <p>The capital backing the risk just changes.</p>
        <h2>A Shift Toward Geopolitical Finance</h2>
        <p>The deeper story here may not be insurance.</p>
        <p>It may be the gradual return of geopolitics into global economic systems.</p>
        <p>For decades, globalization assumed that private markets would handle most commercial risks.</p>
        <p>But strategic industries—shipping, energy, semiconductors—are increasingly entangled with national security.</p>
        <p>That means governments may play larger roles in financial systems tied to global trade.</p>
        <p>Insurance could be one of the first places where this shift becomes visible.</p>
        <h2>A Strange New Economic Era</h2>
        <p>The modern global economy is entering a complicated phase.</p>
        <p>Geopolitical tensions are rising. Supply chains are strategic assets. And technology—from satellite tracking to AI analysis—is making markets react faster than ever.</p>
        <p>Meanwhile, institutions built centuries ago—like Lloyd's of London—are still central to how risk is priced.</p>
        <p>Watching how these forces interact is fascinating.</p>
        <p>Because the future of global trade may depend not only on ships and cargo...</p>
        <p>...but on who is willing to insure the risks of moving them.</p>
      </>
    )
  },
  "geopolitics-ai": {
    slug: "geopolitics-ai",
    tag: "Finance Grind",
    title: "The World Economy During War: While Agentic AI Watches Everything",
    date: "March 5, 2026",
    description: "Something strange is happening in the global economy right now. On one side, geopolitics feels increasingly unstable. On the other, agentic AI is quietly watching the entire system move in real time.",
    seoKeywords: ["agentic AI global economy", "AI and geopolitical risk", "AI financial markets 2026", "autonomous AI trading", "supply chain AI disruption", "war and financial markets", "AI economics explained", "AI watching global trade", "agentic AI finance student", "geopolitics and investing"],
    seoDescription: "Geopolitical instability and agentic AI are colliding in real time. A finance student's perspective on how autonomous AI systems are monitoring wars, supply chains, and markets faster than any human analyst — and what that means for the future of investing.",
    thumbnail: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195299521/m9pkVfcN4EvvpQY2WF9XoU/thumbnail-geopolitics-ai-LdMUHczNcGqfcsaxWQ8oNt.webp",
    content: (
      <>
        <p>Something strange is happening in the global economy right now.</p>
        <p>On one side, geopolitics feels increasingly unstable. Wars, trade tensions, sanctions, supply chain disruptions. Energy markets jump when missiles fly. Shipping routes change overnight. Governments talk about security more than globalization.</p>
        <p>On the other side, artificial intelligence, especially the new generation of agentic AI systems, is processing every signal, every trade, every supply chain disruption in real time, faster than any human analyst ever could.</p>
        <ul>
          <li>Markets reacting to missiles.</li>
          <li>Shipping containers rerouting across oceans.</li>
          <li>Currency markets responding to central bank signals.</li>
          <li>Commodity prices adjusting to geopolitical risk.</li>
        </ul>
        <p>And somewhere in data centers around the world, algorithms are processing it all faster than any human ever could.</p>
        <h2>War and Markets Have Always Been Connected</h2>
        <p>This isn't new. Historically, war has always reshaped economies.</p>
        <ul>
          <li>World War II created modern industrial production.</li>
          <li>The Cold War accelerated technological innovation.</li>
          <li>The Gulf War reshaped oil markets.</li>
        </ul>
        <p>But the difference today is speed.</p>
        <p>Financial markets react instantly. Satellite data, shipping trackers, and commodity futures all move within minutes of geopolitical news.</p>
        <p>The modern economy is a web of interdependencies. Every node is connected to every other node. Disruption anywhere ripples everywhere.</p>
        <h2>The Supply Chain Chessboard</h2>
        <p>Modern wars aren't just fought with weapons. They're fought with logistics.</p>
        <ul>
          <li>Energy pipelines.</li>
          <li>Semiconductor supply chains.</li>
          <li>Rare earth minerals.</li>
          <li>Shipping corridors.</li>
        </ul>
        <p>When conflict disrupts one piece of the system, markets reprice risk everywhere else.</p>
        <p>That's why oil futures spike when tensions rise in the Middle East, or why semiconductor stocks react to tensions in East Asia.</p>
        <p>The modern economy is basically a giant interconnected network. Pull one thread and the whole web vibrates.</p>
        <h2>Enter Agentic AI</h2>
        <p>Now add something new to the picture: agentic AI.</p>
        <p>Unlike older software tools, agentic AI can act autonomously toward goals. It can monitor data streams, detect patterns, and sometimes make decisions without constant human direction.</p>
        <p>Financial institutions are already experimenting with systems that monitor geopolitical news feeds, shipping activity, satellite imagery, macroeconomic indicators, and social media sentiment all simultaneously.</p>
        <p>Imagine an AI system noticing unusual tanker movements in a shipping lane, cross-referencing that with political news, and predicting an energy market shift before traders even finish reading the headline.</p>
        <p>That's not science fiction anymore.</p>
        <h2>Humans Still Run the Show (For Now)</h2>
        <p>Despite the hype, the global economy is still fundamentally human.</p>
        <ul>
          <li>Politicians decide sanctions.</li>
          <li>Central banks set interest rates.</li>
          <li>Investors panic and chase trends.</li>
        </ul>
        <p>AI can analyze patterns, but it can't fully understand human emotion, political strategy, or cultural nuance.</p>
        <p>And finance is still deeply tied to human psychology. Markets move not just because of data, but because of fear, expectations, and narrative.</p>
        <h2>What the BIS Is Documenting in Real Time</h2>
        <p>While agentic AI is watching the global economy, the Bank for International Settlements is watching the financial system that underlies it. And what the BIS documented in its March 2026 Quarterly Review adds a layer to this picture that I think gets overlooked in most conversations about AI and geopolitics.</p>
        <p><a href="https://www.bis.org/publ/qtrpdf/r_qt2603u.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">The BIS found that hyperscalers issued more than $100 billion in corporate bonds in 2025 to finance AI infrastructure.</a> But alongside those public bonds, they also created what the BIS calls "shadow borrowing": off-balance sheet structures, special purpose entities and joint ventures, that hold data center assets and raise debt through private placements. The hyperscaler commits to long-term operating leases while keeping most of the associated debt invisible to standard financial reporting.</p>
        <p>This matters for geopolitics in a specific way. The same financial architecture that is funding the AI systems watching global instability is itself opaque. The debt is held by private credit funds and insurers. Banks support the vehicles with funding lines. The BIS described these as creating "new shock transmission channels." In other words, if geopolitical stress disrupts the AI infrastructure buildout, the financial consequences do not stay contained. They travel through a network of non-bank investors and private credit vehicles that are harder for regulators to monitor than traditional bank lending.</p>
        <blockquote className="pull-quote">
          The AI watching the global economy is financed by shadow debt structures that the BIS says create new risks for the financial system itself.
        </blockquote>
        <p>The BIS January 2026 speech by Tao Zhang, the BIS Chief Representative for Asia and the Pacific, added another dimension. <a href="https://www.bis.org/speeches/sp260126.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">He warned that the widespread use of similar AI models and decision rules across financial institutions can lead them to respond to shocks in similar ways</a>, increasing correlations in behavior and amplifying stress through contagion and procyclicality. The BIS calls this the risk of algorithmic monoculture: when everyone's AI is trained on similar data and optimized for similar objectives, a single geopolitical shock can trigger similar responses across the entire financial system simultaneously.</p>
        <p>That is the feedback loop that concerns me most. Geopolitical instability creates market stress. AI systems trained on similar data respond similarly. Their correlated responses amplify the initial shock. The financial system becomes more volatile precisely because it is more automated.</p>
        <p>And then there is the currency dimension. <a href="https://www.bis.org/publ/bppdf/bispap159.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">The BIS's 2024 survey of 93 central banks found that 91% are now engaged in central bank digital currency work.</a> China's e-CNY had already processed approximately $2.3 trillion in transactions by the end of 2025. This is the financial infrastructure being built during peak geopolitical instability. Digital currencies that can be programmed, monitored, and potentially restricted represent a new kind of financial power that is being developed precisely as the old geopolitical order is being contested.</p>
        <p>Agentic AI is watching the global economy. But the global economy is also being quietly restructured by the financial architecture that funds AI, the algorithmic monoculture that could amplify the next shock, and the digital currency systems that could reshape how money moves across borders during conflict.</p>

        <h2>Watching the World Through a New Lens</h2>
        <p>Studying finance right now feels like watching history unfold in real time.</p>
        <p>You begin to see the invisible threads: how a single geopolitical decision ripples across markets within seconds, how technology doesn't just analyze the economy but fundamentally changes how we understand it, how the global economy isn't governed by laws but by networks of interdependence and fear.</p>
        <p>The combination of war, global markets, and AI analysis creates a fascinating moment.</p>
        <p>Human decisions are shaping the world's direction. But increasingly, machines are the ones observing, measuring, and interpreting those changes.</p>
        <p>Which raises a darker question: In a world where AI sees everything faster than we do, who really controls the narrative? Humans write the headlines. But algorithms write the future.</p>

        <hr className="my-8 opacity-20" />
        <p className="text-sm opacity-75"><strong>Sources and Further Reading:</strong></p>
        <ul className="text-sm opacity-75 space-y-1">
          <li><a href="https://www.bis.org/publ/qtrpdf/r_qt2603u.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Bank for International Settlements, "Financing the AI Infrastructure Boom: On- and Off-Balance Sheet Borrowing," BIS Quarterly Review, March 2026</a></li>
          <li><a href="https://www.bis.org/speeches/sp260126.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Tao Zhang, "The Financial Stability Implications of Artificial Intelligence and Digital Finance," BIS Speech, January 26, 2026</a></li>
          <li><a href="https://www.bis.org/publ/bppdf/bispap159.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Bank for International Settlements, "Results of the 2024 BIS Survey on Central Bank Digital Currencies and Crypto," BIS Papers No. 159, August 2025</a></li>
        </ul>
      </>
    )
  },
  "aon-internship": {
    slug: "aon-internship",
    tag: "Finance Grind",
    title: "Inside My Aon FSG Internship: What I Actually Did",
    date: "March 4, 2026",
    seoKeywords: ["Aon FSG internship experience", "D&O insurance explained", "directors and officers liability", "insurance broking internship", "finance internship Wall Street", "corporate insurance career", "underwriting internship", "Aon financial services group", "finance student internship", "insurance career advice"],
    seoDescription: "What does a finance internship at Aon's Financial Services Group actually look like? A first-person breakdown of broking D&O policies, working with underwriters, navigating corporate insurance, and the real lessons from inside one of the world's largest insurance firms.",
    description: "Not just making coffee. I walk through what broking D&O policies looks like, working with underwriters, and what I learned about risk, power, and corporate drama.",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663195299521/aWgfXVlrlxYEEBXU.png",
    content: (
      <>
        <p>When people hear "insurance," they usually think about car policies or health plans. Before my internship at Aon's Financial Services Group (FSG), that's honestly where my understanding ended too.</p>
        <p>But stepping into the world of corporate insurance broking opened an entirely different side of finance, one focused not on chasing returns, but on protecting companies from catastrophic risk.</p>
        <p>And once you see how that system works, you start realizing how essential it is to the global economy.</p>
        
        <h2>The Role of a Broker in Corporate Insurance</h2>
        <p>At a high level, Aon acts as an insurance broker and advisor.</p>
        <p>Companies don't usually go directly to insurers when they need complex coverage. Instead, they work with brokers who understand both the client's risk profile and the insurance market.</p>
        <p>The broker's job is to:</p>
        <ul>
          <li>Understand the client's financial and operational risks</li>
          <li>Design an insurance program to protect against those risks</li>
          <li>Negotiate with insurers to place coverage</li>
        </ul>
        <p>Think of brokers as architects of risk protection.</p>
        
        <h2>My Exposure to Directors & Officers (D&O) Insurance</h2>
        <p>One of the most interesting areas I worked with was Directors & Officers (D&O) insurance.</p>
        <p>D&O insurance protects corporate executives and board members if they're sued over decisions made while managing a company.</p>
        <p>For example, lawsuits might involve:</p>
        <ul>
          <li>Shareholder disputes</li>
          <li>Regulatory investigations</li>
          <li>Corporate governance claims</li>
        </ul>
        <p>Without this type of insurance, executives could face enormous personal financial liability. That's why D&O is considered one of the most important forms of coverage for public companies.</p>

        <h2>What I Actually Did During the Internship</h2>
        <p>A big part of my role involved supporting the broking team as they prepared insurance programs for clients.</p>

        <h3>Financial Analysis of Clients</h3>
        <p>Before placing insurance, brokers analyze the financial condition of a company. This might involve reviewing revenue trends, debt levels, industry risk exposure, and corporate governance structures. Understanding the financial health of a company helps insurers determine how risky it is to provide coverage.</p>

        <h3>Building Insurance Program Structures</h3>
        <p>Large companies rarely rely on a single insurance policy. Instead, they build layered insurance programs:</p>
        <ul>
          <li>Primary coverage layer</li>
          <li>Excess coverage layers</li>
          <li>Additional specialty coverage</li>
        </ul>
        <p>Each layer may come from a different insurer. Part of the broking process involves coordinating those layers so the client receives complete protection.</p>

        <h3>Working with Underwriters</h3>
        <p>Insurance underwriters are the professionals who decide whether a risk is acceptable and what premium should be charged. During my internship I saw how brokers and underwriters collaborate: brokers advocate for their clients, underwriters evaluate the risk, and the negotiation between those two sides ultimately determines the final insurance program.</p>

        <h2>What Surprised Me About the Insurance Industry</h2>
        <p>Before this experience, I didn't fully appreciate how deeply insurance is connected to the broader financial system.</p>
        <p>Insurance makes many economic activities possible. Companies can raise capital more easily when risks are insured. Executives are more willing to make decisions when liability protection exists. Large projects move forward because catastrophic risks are covered. In many ways, insurance acts as a hidden stabilizer of modern economies.</p>

        <h2>The Human Side of Risk</h2>
        <p>Another thing I noticed quickly: the insurance business is extremely relationship-driven.</p>
        <p>Despite all the financial analysis and policy structures, deals often come down to trust between clients, brokers, and underwriters. That human element reminded me that finance is never purely mathematical. It's about people making decisions under uncertainty.</p>

        <h2>What I Took Away from the Experience</h2>
        <p>My time at Aon helped me understand that finance isn't only about investments or markets. It's also about risk management. Every company faces uncertainty. Insurance is one of the key tools used to manage that uncertainty. Seeing how those systems work behind the scenes was an experience I'll carry forward in my finance career.</p>
      </>
    )
  },
  "grief-and-grind": {
    slug: "grief-and-grind",
    tag: "Life & Growth",
    title: "What Grief Looks Like When You Can't Pause Life",
    date: "December 2025",
    description: "Trying to pass classes, show up for family, and still process losing my mom.",
    seoKeywords: ["grieving while in college", "losing a parent in college", "grief and academic pressure", "coping with loss as a student", "study abroad after loss", "mental health finance student", "grief and ambition", "processing grief while working", "Guyanese American grief", "personal growth through loss"],
    seoDescription: "What does grief look like when life refuses to pause? A personal essay on losing my mom, studying abroad in Ghana, and trying to keep moving when everything inside says stop. For anyone trying to carry loss and ambition at the same time.",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663195299521/gbPCcanLrCwSoRTK.png",
    content: (
      <>
        <p>I left for Ghana the same day my mom passed.</p>
        <p>I didn't plan it that way. The timing was cruel and coincidental. But there I was, on a plane to West Africa, processing the biggest loss of my life while simultaneously trying to show up for a semester abroad that was supposed to be transformative.</p>
        <p>It was disorienting in a way I still don't have words for.</p>
        <p>Grief doesn't pause for logistics. It doesn't wait for you to finish your semester or complete your internship or get your life organized. It just arrives, uninvited, and forces you to figure out how to keep moving.</p>
        
        <h2>The Pressure to Stay Strong</h2>
        <p>One of the hardest parts of losing a parent young is the expectation that you'll hold it together.</p>
        <p>I'm the oldest. I'm supposed to be the responsible one. The one who helps my family navigate this, not the one falling apart.</p>
        <p>So I did what I thought I was supposed to do: I kept going.</p>
        <p>I attended classes. I participated in group projects. I showed up for my family. I didn't cry in public. I made it look like I was fine.</p>
        <p>But internally, I was fractured.</p>
        <p>There's a particular kind of exhaustion that comes from grieving while pretending you're not. It's not just sadness. It's the energy it takes to hold yourself together when everything inside feels like it's falling apart.</p>
        
        <h2>Grief Doesn't Look Like the Movies</h2>
        <p>I expected grief to be this all-consuming thing. Like I'd cry for a week and then slowly get better.</p>
        <p>That's not how it works.</p>
        <p>Grief is random. It hits you in the middle of a conversation about something completely unrelated. You're fine one moment and then a song comes on or you see something that reminds you of them, and suddenly you can't breathe.</p>
        <p>I'd be in class, taking notes, and then I'd remember that my mom would never see me graduate. That she'd never meet my future kids. That there are entire chapters of my life she won't be part of.</p>
        <p>And I'd have to sit there and pretend everything was fine.</p>
        
        <h2>The Guilt of Moving Forward</h2>
        <p>One of the things nobody tells you about grief is the guilt.</p>
        <p>There were moments when I'd laugh at something, and then I'd feel guilty for laughing. Like I wasn't supposed to be happy. Like moving forward meant I was betraying the person I lost.</p>
        <p>I had to learn that healing isn't betrayal.</p>
        <p>Moving forward doesn't mean forgetting. It means learning to carry the loss while still building a life.</p>
        <p>It means that yes, I can be sad about missing my mom AND excited about my future. Both things can be true at the same time.</p>
        
        <h2>What I Learned in Ghana</h2>
        <p>Being in Ghana during that time taught me something unexpected about resilience.</p>
        <p>I was surrounded by people who had experienced loss in ways I couldn't even imagine. People who had lost parents, siblings, children. People who had learned to carry grief as part of their everyday lives.</p>
        <p>And they kept moving. They kept laughing. They kept building.</p>
        <p>They showed me that grief and joy aren't opposites. They're part of the same human experience.</p>
        <p>You can miss someone deeply and still be present for your own life. You can honor their memory by living fully, not by staying frozen in sadness.</p>
        
        <h2>The Long Game</h2>
        <p>It's been a few months now, and I'm still learning how to do this.</p>
        <p>Some days are harder than others. Some days I'm fine, and some days I'm not. Some days I think about her constantly, and some days I go hours without thinking about the loss.</p>
        <p>But I'm learning that that's okay.</p>
        <p>Grief isn't something you "get over." It's something you integrate into who you are.</p>
        <p>You can mourn someone deeply and still keep moving forward. You can carry memories, love, and loss with you while continuing to build a life.</p>
        <p>In many ways, that's what I'm still learning to do—taking each step forward not because the pain disappears, but because the people we love deserve to be remembered in the lives we continue to build.</p>
        <p><em>As a Chinese idiom says:</em></p>
        <p><strong>山重水复疑无路，柳暗花明又一村</strong></p>
        <p><em>Shān chóng shuǐ fù yí wú lù, liǔ àn huā míng yòu yī cūn</em></p>
        <p><em>Just when the road seems to disappear among mountains and rivers, suddenly another village appears ahead.</em></p>
      </>
    )
  },
  "ai-tax-diagram-tool": {
    slug: "ai-tax-diagram-tool",
    tag: "Finance Grind",
    title: "What Jason Yen's Tax Tool Reveals About the Future of Finance Work",
    date: "March 10, 2026",
    description: "Jason Yen built a tax structure diagram tool in 2 hours using ChatGPT Codex with zero coding experience. His story reveals something bigger about how AI is reshaping professional hierarchies and what it means for firms like EY.",
    seoKeywords: ["AI replacing finance jobs", "ChatGPT Codex tax tool", "AI and accounting automation", "future of finance work", "EY AI tools", "junior analyst AI threat", "AI productivity finance", "Jason Yen tax diagram", "AI disrupting professional services", "finance career AI 2026"],
    seoDescription: "Jason Yen built a tax structure diagram tool in 2 hours using ChatGPT Codex with zero coding experience. What does that mean for junior analysts, finance careers, and firms like EY? A breakdown of AI's real impact on professional hierarchies — from someone building a career in the middle of it.",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663195299521/gbPCcanLrCwSoRTK.png",
    content: (
      <>
        <p>I saw a post from Jason Yen at OpenAI that stopped me in my tracks.</p>
        <p>He described building a tax structure diagram tool in 2 hours using ChatGPT Codex. Zero coding experience. Just a clear description of what he needed, and the AI generated a working application.</p>
        <p>What struck me wasn't the speed or the lack of coding knowledge.</p>
        <p>It was what his story reveals about how professional work is fundamentally changing.</p>
        
        <h2>The Old Model: Delegate and Wait</h2>
        <p>At EY, I saw this dynamic play out constantly.</p>
        <p>When a senior person needed a tax structure diagram, they'd hand it off to a junior analyst. The junior would spend an hour or two building it in PowerPoint or Visio. The senior would review, request changes, and wait for the next iteration.</p>
        <p>It was efficient at scale. You hire smart people, teach them the process, and have them execute at volume.</p>
        <p>But there's a hidden cost: iteration speed.</p>
        <p>If you wanted to change how the diagram worked, you couldn't just tweak it yourself. You had to explain the change to someone else, wait for them to implement it, and review the result. That cycle could take hours or days.</p>
        <p>Jason's story is different.</p>
        
        <h2>The New Model: Build and Iterate Immediately</h2>
        <p>Jason didn't delegate. He built.</p>
        <p>Two hours later, he had a working tool. And here's the key part: if he doesn't like something, he can change it himself immediately, with no waiting and no communication overhead.</p>
        <p>That's not just faster. That's a fundamentally different way of working.</p>
        <p>At EY, I worked on complex tax strategies that required multiple rounds of refinement. Each round meant explaining changes, waiting for updates, reviewing results. The work got done, but the cycle was slow.</p>
        <p>With AI tools, the bottleneck shifts.</p>
        <p>It's no longer execution. It's thinking.</p>
        
        <h2>What This Means for the Hierarchy</h2>
        <p>The traditional model of professional services assumes a clear division: senior people think, junior people execute.</p>
        <p>Knowledge flows down. Work flows up.</p>
        <p>But when senior people can execute their own ideas in real time, that hierarchy flattens.</p>
        <p>Jason's post includes a disclaimer: his tool won't replace PowerPoint or Visio. It's not as polished. It doesn't have all the features of enterprise software. But that's exactly the point.</p>
        <p>It does exactly what he needs, exactly when he needs it, and he can change it whenever he wants. That's a different value proposition than professional tools offer.</p>
        <p>And it changes what junior analysts are for.</p>
        
        <h2>The Uncomfortable Question for Firms Like EY</h2>
        <p>If senior professionals can build their own tools using AI, what happens to the junior analyst role?</p>
        <p>The answer isn't that junior staff disappear. It's that their work shifts.</p>
        <p>They might spend less time on diagram-building and more time on higher-level analysis, client interaction, or strategic thinking. Or they might focus on different types of work altogether.</p>
        <p>But here's what's uncomfortable: the firms that don't adapt will find themselves slower and more expensive than the ones that do.</p>
        <p>The firms that empower their senior people with AI tools and reorganize workflows around that capability will see productivity gains.</p>
        <p>The firms that try to protect the old model, where junior staff do routine work, might find themselves at a disadvantage.</p>
        
        <h2>The Deeper Shift</h2>
        <p>Jason's story is small, but it signals something much larger.</p>
        <p>For decades, professional services operated on a model of leverage: senior people manage relationships and strategy, junior people execute. It's scalable. It's profitable. It works.</p>
        <p>But AI tools are changing the economics of execution.</p>
        <p>When execution becomes cheap and fast, the value of professional work shifts toward thinking, judgment, and client relationships.</p>
        <p>That's not bad for junior staff. In fact, it might be better. Junior analysts who spend their time thinking critically about tax strategy, not building diagrams, are more engaged and more valuable.</p>
        <p>But it requires firms to reorganize how they work.</p>
        
        <h2>What I Learned at EY</h2>
        <p>My time at EY taught me how large financial services firms operate. The systems are sophisticated. The processes are refined. The talent is exceptional.</p>
        <p>But they're also built on assumptions about how work gets done.</p>
        <p>Jason's post challenges one of those assumptions: that building tools requires coding expertise, or that building tools is junior work.</p>
        <p>It's neither.</p>
        <p>It's just work that needed to get done, and now it can be done faster and better by the person who understands the problem.</p>
        
        <h2>The Real Question</h2>
        <p>The question isn't whether AI will replace professional tools or junior staff.</p>
        <p>The question is: how fast will firms like EY adapt their workflows to take advantage of what AI can do?</p>
        <p>The firms that move quickly will see their senior people become more productive, more autonomous, and more creative.</p>
        <p>The firms that move slowly will watch their competitors pull ahead.</p>
        <p>Jason's tax diagram tool is small. But it's a signal of a much bigger shift happening in how professional work gets organized.</p>
        <p>And for anyone in finance—especially those who spent time at firms like EY—that shift is worth paying very close attention to.</p>
      </>
    )
  },
  "training-models-waiting-for-job": {
    slug: "training-models-waiting-for-job",
    tag: "Finance Grind",
    title: "Training the Models, Still Waiting for the Job: The Strange Reality of Entry-Level AI Work",
    date: "June 11, 2026",
    description: "I have been doing the work companies say they want: LLM evaluation, prompt engineering, workflow testing. So why is it still so hard to land a full-time role in AI?",
    seoKeywords: ["entry-level AI jobs 2026", "prompt engineering career", "LLM evaluation work", "AI job market for graduates", "AI hiring discrimination", "human-in-the-loop jobs", "AI workforce gap", "finance AI career path", "AI screened out of jobs", "training AI models no job offer", "AI labor market inequality", "new grad AI job search"],
    seoDescription: "I have been doing the work companies say they want: LLM evaluation, prompt engineering, AI workflow testing. So why is it still so hard to land a full-time role? A candid look at the gap between doing AI work and getting hired for it — with data from Stanford, the ILO, and the OECD to back it up.",
    content: (
      <>
        <p>For the past several months, I have been helping evaluate and improve AI systems. Reviewing outputs. Testing prompts. Judging accuracy. Working through workflows where a few words can change the entire result.</p>
        <p>Yet I am still trying to convince employers that this experience counts.</p>
        <p>That contradiction has become one of the stranger parts of trying to build an early career in artificial intelligence. Companies say they want AI-literate workers. Job descriptions ask for prompt engineering, automation, workflow improvement, data quality, model evaluation, and AI fluency. But many people already doing pieces of that work are still treated as if their experience does not fit neatly enough into a recognizable box.</p>
        <p>I am not a machine learning engineer. I am not pretending that prompt evaluation replaces years of technical depth, research, or product development. Machine learning researchers, engineers, developers, and technical teams have spent years building the systems everyone is now rushing to adopt. Their work is foundational.</p>
        <p>But there is another layer of AI work that receives far less attention: the human labor that helps these systems become usable. Prompt testers. Model evaluators. Data reviewers. Workflow contributors. Annotators. Quality assurance workers. The people identifying when a model sounds convincing but is wrong. When it misses intent. When a prompt creates confusion. When an output looks polished but fails the task. That work matters.</p>
        <blockquote className="pull-quote">
          I am helping improve the systems that companies are racing to adopt, yet I am still trying to convince employers that this experience counts.
          <cite>Dekena Wade</cite>
        </blockquote>

        <h2>Prompt Engineering Is More Than Clever Wording</h2>
        <p>A lot of people hear "prompt engineering" and assume it means simply typing clever instructions into ChatGPT. That is not what the work actually requires. Good prompt engineering is about structure, accuracy, task design, constraints, expected outputs, edge cases, and knowing when a model is giving a fluent answer that is still wrong. It requires judgment. It requires patience. It requires understanding how people ask questions, how systems interpret instructions, and how mistakes appear before they become obvious.</p>
        <p>In LLM evaluation work, accuracy is not just about whether an answer sounds polished. A response can be confident, well-written, and completely incorrect. That is where human evaluators matter. We check whether the model followed the instruction, whether the reasoning is consistent, whether the answer matches the user's intent, and whether the output is useful in a real-world context.</p>
        <p>This kind of work sits between technology, communication, research, and operations. It is not always glamorous, but it is important. Without human reviewers, prompt testers, and workflow evaluators, AI systems would be far less reliable.</p>

        <h2>AI Quality Is Not Just a Technical Problem</h2>
        <p>My recent experience has taught me that AI quality is not only a technical problem. It is also a language problem. A design problem. A business problem. A prompt that works in one context can fail in another. A workflow that makes sense to a technical team can confuse an everyday user. A model that performs well during testing can still struggle with messy, real-world instructions.</p>
        <p>That is why I do not see prompt accuracy and AI evaluation as temporary trends. They are becoming part of how organizations manage productivity, documentation, training, customer support, compliance, and internal operations.</p>
        <blockquote className="pull-quote">
          Many of the people doing this early AI labor are still treated as temporary, invisible, or replaceable.
        </blockquote>

        <h2>The Uneven Value of Human AI Labor</h2>
        <p>The uncomfortable truth is that much of this early AI labor remains unstable and unevenly valued. The AI industry depends on layers of work. At the top are model developers, researchers, product leaders, designers, strategists, and executives building and selling AI systems. They capture much of the visibility, compensation, and long-term opportunity.</p>
        <p>Below that is a large group of people helping those systems function in practice: evaluators, prompt testers, workflow contributors, and quality reviewers. People catching mistakes, improving usability, and identifying failure points. The products depend on human judgment, but the market does not always reward that judgment equally.</p>
        <p>These are often the remote contract roles advertised as data annotation, AI training, content evaluation, or model-testing jobs. Applicants complete assessments measuring reasoning, attention to detail, and common-sense judgment — the same skills needed to determine whether an AI output is useful or simply hallucinating. That creates tension. Companies want AI systems that are accurate, safe, and enterprise-ready. Much of the feedback required to improve those systems comes from workers who are outsourced, temporary, or lightly compensated.</p>
        <p>I am still proud to contribute, even as a small drop in a much larger pond. My evaluations and feedback may help improve tools that millions of people eventually use. But contribution does not equal stability.</p>

        <h2>Building AI While the Job Market Tightens</h2>
        <p>Many of the firms I once hoped to work for are investing heavily in AI while downsizing, restructuring, or becoming more selective with hiring. That changes the reality for entry-level candidates and even professionals like me with several years of broader work experience. The same technology that makes my background feel relevant also seems to be tightening the market around it.</p>
        <p>Companies want AI-enabled workers. They train fewer workers. They want innovation. They expect junior candidates to arrive already operating like mid-level professionals. They want adaptability. They still evaluate people through narrow labels.</p>
        <p>That contradiction naturally makes me want to move higher up the AI value chain. If I have developed a skill for evaluating model behavior, identifying workflow failures, improving prompt accuracy, and understanding how people interact with AI systems, I do not want to remain only at the edge of the process. I want to understand how these systems are designed, implemented, governed, and measured.</p>
        <p>But moving upward introduces another question: what qualifications will employers require before they consider this experience legitimate? Will practical work be enough? Will I need a technical master's degree? Will I need to become a data scientist, machine learning engineer, product manager, or AI-governance specialist to receive greater stability and recognition? Those questions become even more difficult when hiring decisions themselves are increasingly shaped by algorithms.</p>
        <blockquote className="pull-quote">
          The quality of the product depends on human judgment, but the market does not always reward that judgment equally.
        </blockquote>
        <p>The work is necessary, but it is often treated as low-cost labor.</p>
        <p>That creates a strange tension. Companies want AI systems to be accurate, safe, useful, and enterprise-ready, but much of the human feedback needed to improve those systems is outsourced, temporary, or lightly compensated. In other words, the quality of the product depends on human judgment, but the market does not always reward that judgment equally.</p>

        <h2>What the Data Actually Shows</h2>
        <p>The uneven impact is beginning to appear in labor-market data. <a href="https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Researchers at the Stanford Digital Economy Lab</a> found that employment among workers ages 22 to 25 declined significantly in occupations most exposed to generative AI, while more experienced workers in those same fields remained comparatively stable. The <a href="https://www.bls.gov/opub/ted/2025/ai-impacts-in-bls-employment-projections.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">U.S. Bureau of Labor Statistics</a> reports that industries with greater AI exposure are experiencing stronger labor-productivity growth and becoming more capital-intensive. That may be good for firms and output, but it raises a harder question: who benefits when productivity rises faster than access to stable work? AI may be making institutions more productive without making career mobility more accessible.</p>
        <p>The <a href="https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">International Labour Organization</a> estimates that one in four jobs worldwide has some exposure to generative AI, with clerical work facing the highest exposure and professional occupations increasingly affected. Official U.S. projections show the contradiction clearly: AI may weaken demand in several administrative and support occupations while increasing demand for the technical workers who build and implement the systems.</p>
        <p>An <a href="https://www.oecd.org/en/publications/algorithmic-management-in-the-workplace_287c13c4-en.html" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">OECD survey of more than 6,000 managers</a> found that algorithmic-management tools are already widely used, while managers themselves reported concerns about accountability and their ability to understand how the systems reach decisions. That is not a fringe problem. It is a structural feature of how hiring and performance evaluation are increasingly organized.</p>
        <p>None of this proves that AI is eliminating every job or that every entry-level candidate is shut out. The more accurate framing is this: AI investment is creating high-skill opportunities while simultaneously weakening some entry-level pathways, automating exposed tasks, and increasing employers' use of opaque algorithmic decision systems. That is the tension I am navigating.</p>

        <h2>When Different Employers Use the Same Hiring Logic</h2>
        <p>Candidates are not only competing against other applicants anymore. They are also navigating résumé parsers, ranking systems, keyword filters, automated assessments, scoring tools, and algorithmic assumptions about who appears to be a good fit.</p>
        <p>A recent Stanford-led study gives this concern a much stronger empirical foundation. In <em>Algorithmic Monocultures in Hiring</em>, researchers examined approximately 4.2 million real job applications from more than 3 million applicants across 156 employers and 11 industries. The applications were evaluated using algorithms created by the same hiring vendor.</p>
        <p>The researchers describe the resulting problem as an algorithmic monoculture. When multiple employers rely on the same vendor, candidates may appear to be receiving independent decisions from different companies while repeatedly encountering the same underlying assessment logic. A person rejected by several employers may not be receiving several truly independent evaluations. The same technological bottleneck may be influencing each outcome.</p>
        <p>The study found that 4% of applicants who applied to 10 positions were recommended for rejection from all 10, a higher rate than would be expected if the decisions were independent. It also identified significant racial disparities. Approximately 25.87% of applications submitted by Black applicants went to positions where the algorithm produced adverse impact against Black candidates under U.S. employment-discrimination standards. The corresponding figure for Asian applicants was 14.74%.</p>
        <p>The study also clarifies a claim that has recently gone viral online. Applicants using the vendor's system completed assessment games that generated behavioral features. Twelve of those games were shared across positions, and the resulting features could be stored and reused if an applicant applied to another position mediated by the same vendor within the following 330 days. That does not mean every applicant-tracking system stores one permanent résumé score. It also does not mean a rejection automatically follows someone across the entire labor market. The finding was specific to the vendor and assessment system studied.</p>
        <p>Still, the broader implication is difficult to dismiss. If several employers use the same platform, information from one assessment may influence multiple applications. Candidates may update their résumés, gain new experience, or apply to a completely different position while some of the underlying assessment data remains unchanged.</p>
        <p>The racial findings are especially concerning because automation is often presented as a way to make hiring more consistent and objective. But consistency is not automatically fairness. A system can apply the same process repeatedly and still reproduce unequal outcomes at scale. This is what makes algorithmic monoculture so consequential. A biased decision by one employer affects one hiring process. A biased or overly rigid system shared across many employers can influence access to an entire portion of the labor market.</p>
        <blockquote className="pull-quote">
          Candidates using the same LLM as the evaluator were <strong>23% to 60% more likely to be shortlisted</strong> in simulated hiring pipelines than equally qualified applicants submitting human-written résumés.
          <cite>— Xu, Li &amp; Jiang, <em>AI Self-preferencing in Algorithmic Hiring</em> (SSRN)</cite>
        </blockquote>
        <p>Trust in automated hiring has withered on the candidate side, even as these systems may make reviewing large applicant pools more efficient for employers. Candidates are therefore no longer only asking whether they have the right experience. They are also asking whether their experience is being interpreted correctly, whether they are being independently evaluated, and if an algorithm misunderstands them once, how many other opportunities that same judgment could affect.</p>

        <h2>AI Self-Preference Creates Another Layer</h2>
        <p>Algorithmic monoculture is not the only concern. Another study, <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5255068" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80"><em>AI Self-Preferencing in Algorithmic Hiring: Empirical Evidence and Insights</em></a>, examined whether LLM-based résumé evaluators favor résumés generated by the same model. The researchers found that simulated hiring pipelines could favor candidates whose application materials were produced by the same LLM used to evaluate them.</p>
        <p>This introduces another strange possibility into automated hiring. Applicants may not only be rewarded for having the right experience or using the right keywords. They may also be rewarded for writing in the style an evaluator model already recognizes as similar to its own output. That creates a deeper concern about what "fit" means in an algorithmic hiring process. Is the system identifying the strongest candidate, or is it identifying the candidate whose résumé most closely resembles the language patterns the model already prefers?</p>
        <p>Together, these studies suggest that automated hiring may introduce forms of bias that are difficult for applicants to see, understand, or challenge. The issue is not that every employer uses the same system or that every algorithm produces unfair outcomes. The issue is opacity. Applicants often do not know what system evaluated them, what information was considered, how long it may be retained, whether it is reused, or how much influence it had over the final decision.</p>

        <h2>Redefining My Lane</h2>
        <p>I started as a finance student interested in fintech, financial operations, and the emerging AI products being introduced into older financial institutions. At first, that felt like a strong lane: finance plus technology, traditional institutions plus new tools, business judgment plus AI literacy.</p>
        <p>Now, I am less certain.</p>
        <p>Instead of only chasing roles with "finance" or "AI" in the title, I have started looking more broadly at operations, risk, data quality, AI governance, product workflows, compliance, and business transformation. These may not have been the roles I originally imagined, but they may be closer to where my actual experience fits.</p>
        <p>I still believe financial institutions need people who understand both legacy systems and emerging AI tools. But I also understand now that interest alone is not enough. I have to show where I can reduce friction, improve accuracy, support responsible adoption, and translate between business teams and technical systems.</p>
        <p>That shift has been uncomfortable, but maybe necessary.</p>

        <h2>Finance Thinking Applied to AI</h2>
        <p>My background in finance also shapes how I see this. In finance, accuracy is not optional. A small error in a model, assumption, or output can affect decisions. The same applies to AI systems. If companies want to use LLMs in finance, operations, compliance, customer support, or internal productivity, then prompt accuracy and evaluation standards cannot be treated like casual side tasks.</p>
        <p>They need people who understand both the tool and the consequences of using it poorly.</p>
        <p>That is where I am building my lane: at the intersection of AI evaluation, prompt engineering, workflow design, and business decision-making. I am learning how models respond, where they fail, and how better instructions can improve outcomes. I am also learning that the future of work is not just about building AI systems. It is about knowing how to manage them responsibly.</p>

        <h2>Still Building</h2>
        <p>Still, the job-market reality is humbling. It feels ironic to help train LLMs while struggling to get hired into full-time roles shaped by those same technologies. It makes me wonder whether AI is creating opportunity, concentrating opportunity, or simply changing the language of exclusion.</p>
        <p>Maybe the answer is all three.</p>
        <p>For now, I am continuing to build. I am documenting the work, sharpening my technical vocabulary, strengthening my portfolio, and translating this experience into clearer proof of value. Because the work is real, even when the job market does not know how to categorize it yet.</p>
        <blockquote className="pull-quote">
          Sometimes you are already doing the work before the title catches up.
        </blockquote>


        <hr className="my-8 opacity-20" />
        <p className="text-sm opacity-75"><strong>Related reading:</strong> For the primary research on algorithmic monoculture and racial disparities in automated hiring, see: Karan Gulati, Manish Raghavan, and Jon Kleinberg, <a href="https://arxiv.org/abs/2506.04997" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80"><em>Algorithmic Monocultures in Hiring</em></a> (Stanford / Cornell, 2025). For research on AI self-preferencing in résumé evaluation, see: Jiannan Xu, Gujie Li, and Jane Yi Jiang, <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5255068" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80"><em>AI Self-preferencing in Algorithmic Hiring: Empirical Evidence and Insights</em></a> (SSRN). For data on AI's impact on labor productivity and capital investment, see the U.S. Bureau of Labor Statistics, <a href="https://www.bls.gov/opub/ted/2025/ai-impacts-in-bls-employment-projections.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">"AI Impacts in BLS Employment Projections"</a> (BLS, 2025).</p>
      </>
    )
  },
  "graduating-into-inflation": {
    slug: "graduating-into-inflation",
    tag: "Finance Grind",
    title: "Graduating Into 4.2% Inflation: What 20 Years of Data Tell Us About Opportunity",
    date: "June 11, 2026",
    description: "The U.S. inflation rate in May 2026 matches exactly what it was in May 2006. The economy surrounding that number is not the same. Here is what the comparison actually tells us.",
    seoKeywords: ["inflation 2026 graduates", "graduating into recession", "CPI May 2026", "underemployment rate new grads", "cost of living 2026", "entry-level jobs inflation", "Brooklyn College commencement 2026", "class of 2026 job market", "inflation vs wages 2026", "labor market graduates 2026", "2008 financial crisis comparison", "NY Fed graduate unemployment"],
    seoDescription: "U.S. headline inflation hit 4.2% in May 2026 — up from 2.4% just one year earlier. What does that mean for the class of 2026 entering the job market? A 20-year data comparison connecting CPI, underemployment, and the 2008 financial crisis to what recent graduates are actually facing right now.",
    content: (
      <>
        <p>Twenty years ago, in May 2006, the United States annual inflation rate was 4.2%.</p>
        <p>Ten years later, in May 2016, it was only 1.0%.</p>
        <p>Now, in May 2026, it has returned to 4.2%.</p>
        <p>The number is the same as it was two decades ago. The economy surrounding it is not.</p>
        <p>That difference matters, especially for recent graduates entering a labor market where the price of almost everything involved in beginning a career has increased.</p>
        <p>Transportation costs money. Professional clothing costs money. Certifications, relocation, food, rent, and simply staying financially stable while waiting for an offer all cost money. Even applying for jobs carries expenses that do not appear in employment statistics.</p>
        <p>For students from working-class families, the job search may happen alongside household bills, caregiving, paperwork, and pressure to begin earning immediately.</p>
        <p>That is why I do not see inflation as only a price problem.</p>
        <p>I increasingly see it as an opportunity problem.</p>

        <h2>The Number That Brought Me Back to Class</h2>
        <p>Earlier this semester, one of my usual finance assignments required me to follow reporting from The Wall Street Journal and connect current economic developments to what we were studying.</p>
        <p>One of the stories that stayed with me concerned inflation rising to 3.8% in April 2026. At the time, I was already thinking about the effect of higher prices on hiring, household decisions, financial institutions, and people trying to position themselves for better careers.</p>
        <p>Then the May report arrived.</p>
        <p><a href="https://www.bls.gov/news.release/cpi.nr0.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Annual inflation had accelerated to 4.2%. Core inflation, which excludes food and energy, was lower at 2.9%. Energy prices were a major contributor to the headline increase</a>, rising 23.5% year over year, with gasoline up 40.5% and energy accounting for more than 60% of the monthly CPI increase.</p>
        <p>On paper, that distinction matters. Economists separate headline and core inflation because food and energy prices can be volatile. Policymakers need to understand whether price pressures are broad and persistent or heavily concentrated in a few categories.</p>
        <p>But consumers do not get to remove energy from their monthly budgets.</p>
        <p>People still have to commute. They still have to pay for utilities, groceries, deliveries, and transportation-dependent goods. Recent graduates still have to reach interviews, attend networking events, relocate, or travel to jobs that may require several days in an office.</p>
        <p>A lower core rate does not erase the pressure created by a higher headline rate.</p>
        <p>And this acceleration is not a continuation of a stable trend. In May 2025, U.S. headline inflation was 2.4% year over year, with core inflation also at 2.9%. By May 2026, headline inflation had jumped to 4.2%, a rise of 1.8 percentage points in a single year. That means 2026 is not merely "still expensive." Inflation has reaccelerated significantly compared with the same month last year.</p>

        <h2>2006: The Same Number, a Different Economy</h2>
        <p><a href="https://www.bls.gov/news.release/archives/cpi_07142006.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">In May 2006, annual inflation was also 4.2%</a>, with motor fuel rising 5.0% that month and gasoline up 6.6% before seasonal adjustment.</p>
        <p>Energy pressures were important then too. Gasoline prices had jumped sharply during the spring, following the energy-market disruptions and volatility of the previous year. The economy was still expanding, and unemployment remained relatively low.</p>
        <p>From the perspective of many households, the country did not yet appear to be approaching a historic financial crisis.</p>
        <p>That is part of what makes hindsight uncomfortable.</p>
        <p>By 2006, <a href="https://fcic-static.law.stanford.edu/cdn_media/fcic-reports/fcic_final_report_full.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">vulnerabilities were already developing in the housing and financial systems</a>. Mortgage lending and financial risk were expanding in ways that the Financial Crisis Inquiry Commission later identified as major contributors to the crisis. Housing prices had climbed rapidly. Financial institutions had increased their exposure to mortgage-related securities, while many borrowers were carrying loans that would become difficult to repay.</p>
        <p>Still, the broader public did not experience May 2006 as the obvious beginning of a collapse.</p>
        <p>The inflation rate alone did not announce what was coming.</p>
        <p>That is an important lesson: one economic statistic cannot tell us the entire direction of the economy.</p>
        <p>A 4.2% inflation rate can exist during continued expansion, before a downturn, during an energy shock, or alongside a changing labor market. The meaning depends on what is driving prices, what is happening to wages and employment, and how exposed households and institutions are to other forms of risk.</p>

        <h2>2008: When Falling Inflation Did Not Mean Recovery</h2>
        <p>The financial crisis provides the most important warning in this comparison.</p>
        <p><a href="https://www.bls.gov/news.release/archives/cpi_08152008.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">During the summer of 2008, annual inflation reached 5.6%. Gasoline prices were almost 38% higher than they had been one year earlier.</a></p>
        <p><a href="https://www.bls.gov/news.release/archives/cpi_01162009.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">By December, annual inflation had collapsed to just 0.1%</a>, with energy falling 21.3% over the year and petroleum-based energy prices down 40.5%.</p>
        <p>Viewed without context, that dramatic decline might sound like good news. Inflation had nearly disappeared.</p>
        <p>But the economy had not improved.</p>
        <p><a href="https://www.bls.gov/news.release/archives/empsit_01092009.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">The financial system was in crisis. Demand was weakening. Businesses were pulling back. Energy prices were collapsing. Unemployment was rising. Households were losing wealth, jobs, and financial security.</a></p>
        <p>Inflation fell partly because the economy had become much weaker.</p>
        <p>That is why lower inflation cannot automatically be treated as proof of better economic conditions.</p>
        <p>Inflation can decline because supply chains improve, production becomes more efficient, or energy prices normalize.</p>
        <p>It can also decline because consumers cannot spend, companies stop hiring, and economic activity contracts.</p>
        <p>Those outcomes look similar in the inflation rate. They feel completely different to workers.</p>
        <p>This distinction is especially important when discussing what the end of 2026 might look like. Even if inflation is lower by December, the real question will be why it fell and what happened to employment while it was falling.</p>
        <p>A lower number accompanied by stable hiring, stronger real wages, and easing energy costs would be encouraging. A lower number caused by weaker demand, hiring freezes, and layoffs would tell a much darker story.</p>

        <h2>2016: A Calmer Price Environment</h2>
        <p>The 2016 comparison offers a different picture.</p>
        <p><a href="https://www.bls.gov/charts/consumer-price-index/consumer-price-index-by-category-line-chart.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">In May 2016, annual inflation was only 1.0%. Energy prices were more than 10% lower than they had been a year earlier</a>, with gasoline down 16.9%.</p>
        <p>The United States was several years into its recovery from the Great Recession. The labor market was not perfect, and many graduates still faced underemployment, low starting salaries, and uneven access to professional careers.</p>
        <p>But those graduates were not entering the same inflationary environment as the classes of 2006 or 2026.</p>
        <p>That matters because low inflation creates more breathing room, even when wages and employment remain imperfect.</p>
        <p>A graduate searching for work still has to pay rent, transportation, and food. But those expenses are not rising as quickly. Employers may still be selective, but candidates are not facing the same combination of elevated living costs and uncertainty about whether inflation will cause interest rates, corporate expenses, or hiring plans to change.</p>
        <p>The contrast demonstrates that employment and inflation interact. A difficult job market becomes even more difficult when the cost of waiting rises.</p>

        <h2>The Class of 2026 Enters the Picture</h2>
        <p><a href="https://www.brooklyn.cuny.edu/web/news/bcnews/bcnews_250527_commencement.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">This spring, Brooklyn College celebrated more than 4,100 graduates at its 101st commencement.</a></p>
        <p>That is an achievement worth celebrating. Students completed degrees while navigating academic demands, family responsibilities, financial pressure, commuting, work, and years of disruption across the economy and education system.</p>
        <p>But I would be lying if I said I have not wondered how many of those graduates will find meaningful placements.</p>
        <p>How many will receive full-time offers connected to their degrees? How many will accept unrelated work because they need immediate income? How many will continue applying for months? How many will take additional courses, certifications, internships, or graduate degrees because the bachelor's degree they just completed is being treated as insufficient? How many will technically be employed but remain underemployed?</p>
        <p><a href="https://www.newyorkfed.org/research/college-labor-market/college-labor-market_compare-majors.html" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">The Federal Reserve Bank of New York reported that the underemployment rate for recent college graduates remained around 41.5% in early 2026</a>. The same report placed recent-graduate unemployment at approximately 5.7% in the first quarter of 2026. That means a substantial portion of graduates were working in jobs that typically do not require a college degree.</p>
        <p>That number complicates the usual celebration of graduate employment. Finding any job and finding a career-building job are not the same thing.</p>
        <p>A graduate may be working, contributing to household expenses, and avoiding unemployment while still being unable to enter the field they studied. That person may appear economically stable in one statistic while feeling stalled in real life.</p>

        <h2>Inflation Raises the Cost of Waiting</h2>
        <p>For recent graduates, inflation does more than reduce purchasing power. It reduces time.</p>
        <p>A graduate with savings can remain selective longer. They can wait for a role connected to their field, complete an unpaid or lightly paid internship, study for a certification, or relocate for an opportunity.</p>
        <p>A graduate without that cushion may have to accept the first available job. That is not a failure of ambition. It is a financial constraint.</p>
        <p>Higher prices shorten the amount of time someone can spend searching. They make career experimentation more expensive. They turn professional development into a luxury. They increase the pressure to prioritize immediate income over long-term mobility.</p>
        <p>This is where inflation becomes deeply unequal. Some graduates return to households that can support them. Others return to households that need their support. Some can concentrate on applications. Others are balancing applications with elder care, childcare, paperwork, rent, debt, and household emergencies.</p>
        <p>The inflation rate applies nationally. Its consequences are experienced personally.</p>

        <h2>Public-College Graduates and the Competition for Opportunity</h2>
        <p>The pressure is especially relevant for public-college students in New York City.</p>
        <p>Brooklyn College students are physically close to major financial institutions, technology companies, law firms, consulting firms, nonprofits, media companies, and government agencies. But geographic proximity does not automatically create professional access.</p>
        <p>Many competitive employers recruit through established university pipelines. Candidates from highly ranked and well-funded institutions may have access to alumni networks, dedicated recruiting teams, prestigious internships, career coaching, and employers that already recognize their school names.</p>
        <p>Public-college students may have just as much talent while carrying more responsibilities and receiving less institutional support. They are often expected to close that gap individually: network more, earn more certifications, complete more internships, build more projects, attend more events, pursue another degree.</p>
        <p>Each instruction sounds reasonable by itself. Together, they require significant time and money.</p>
        <p>This is why the rising cost of living cannot be separated from discussions about merit and mobility. The qualifications employers demand are increasingly expensive to acquire.</p>

        <h2>What Could the End of 2026 Look Like?</h2>
        <p>History does not provide a single answer.</p>
        <p>The 2006 comparison shows that 4.2% inflation can appear during an economy that still looks stable on the surface. The 2008 comparison shows that inflation can fall rapidly while employment and financial stability deteriorate. The 2016 comparison shows what a calmer inflation environment looks like, although low inflation alone did not eliminate underemployment or unequal access to opportunity.</p>
        <p>For 2026, several broad outcomes remain possible. Energy prices could ease, allowing headline inflation to fall while the labor market remains stable. Inflation could stay elevated, maintaining pressure on household budgets and influencing interest-rate decisions. The economy could weaken, bringing inflation down while employers reduce hiring. Or the United States could experience some combination of slowing growth, uneven hiring, and persistent costs in essential categories.</p>
        <p>No one inflation report can tell us which path will occur. That is why I am more interested in the relationship between the numbers than in one dramatic prediction.</p>
        <p>What happens to entry-level hiring? What happens to real wages? What happens to rent, transportation, and energy? What happens to graduates who cannot afford to wait? What happens to students who are encouraged to pursue even more education because their current qualifications no longer feel sufficient?</p>
        <p>Those questions will tell us more about mobility than the December inflation rate by itself.</p>

        <h2>What the BIS Is Watching</h2>
        <p>While the inflation data I have been tracking comes from the Bureau of Labor Statistics, there is another institution whose March 2026 analysis added a dimension I had not fully considered: the Bank for International Settlements.</p>
        <p>The BIS is the central bank for central banks. When it identifies a risk, it is not speculating. It is documenting something that monetary policymakers across the world are already watching.</p>
        <p><a href="https://www.bis.org/publ/qtrpdf/r_qt2603u.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">In its March 2026 Quarterly Review, the BIS documented what it called "shadow borrowing" in the AI infrastructure sector.</a> Hyperscalers, the major technology companies building out data center capacity, issued more than $100 billion in corporate bonds in 2025 alone, mostly with maturities over five years. But alongside those public bond issuances, they also created off-balance sheet structures: joint ventures and special purpose entities that hold data center assets and raise debt through private placements, with the hyperscaler committing to long-term operating leases while keeping most of the associated debt off its books.</p>
        <p>The BIS noted that credit default swap spreads rose for lower-rated hyperscalers, reflecting both the volume of supply and, in the BIS's own words, "uncertainties around the projects' payoffs." That phrase matters. The world's most important financial institution is saying, in formal language, that the economic return on this infrastructure buildout is not guaranteed.</p>
        <blockquote className="pull-quote">
          The BIS is warning that the same infrastructure boom driving energy prices higher may not generate the productivity gains needed to offset what it costs.
        </blockquote>
        <p>For recent graduates, this connects directly to the inflation they are experiencing. The energy price surge that accounts for more than 60% of the May 2026 CPI increase is not unrelated to the construction, power demand, and land acquisition required for data center expansion. The BIS's shadow borrowing structures channel enormous capital into AI infrastructure, competing with other investment and driving up costs in energy, construction, and real estate markets. Those costs filter through to the prices that graduates pay for housing, utilities, and transportation.</p>
        <p>The BIS also noted that these off-balance sheet structures create new links between hyperscalers and non-bank investors, with banks supporting the vehicles through funding lines and creating what the BIS described as "new shock transmission channels." That is the language of systemic risk. It means that if the AI infrastructure buildout runs into trouble, the financial stress does not stay contained within the technology sector. It can propagate.</p>
        <p>None of this means a financial crisis is coming. But it does mean that the economic environment graduates are entering is more interconnected and more opaque than the headline inflation number suggests. The same forces driving the price of energy and housing are also creating financial architecture that central banks are actively monitoring for stability risks.</p>

        <h2>Experiencing the Numbers as an Adult</h2>
        <p>The 2008 financial crisis was technically the first major economic collapse I lived through. But I was eight years old. I was not reading CPI reports, studying labor markets, or thinking about whether inflation was driven by energy prices. I understood the economy through whatever adults around me were experiencing.</p>
        <p>Now I am experiencing this period as an adult, a finance graduate, an AI contributor, and someone trying to build a stable career. The data feels different when it describes the environment in which you are expected to make life decisions.</p>
        <p>Should I accept the first available job? Should I pursue graduate school? Should I move into a more technical field? Should I continue applying to finance roles? Should I focus on policy, technology, risk, or operations? How long can I afford to search?</p>
        <p>Those are personal questions, but they are shaped by economic conditions. That is what finance has increasingly come to mean to me. It is not only about markets, securities, or corporate decisions. It is about how economic systems narrow or expand the choices available to ordinary people.</p>

        <h2>The Real Question Behind 4.2%</h2>
        <p>The most interesting part of the 20-year comparison is not that inflation was 4.2% in both May 2006 and May 2026. It is that the same statistic can exist inside two different economic stories.</p>
        <p>The number does not tell us who has savings. It does not tell us who is caring for relatives. It does not tell us who is underemployed. It does not tell us who can afford to move for a job. It does not tell us which graduates have professional networks or which ones are trying to create those networks from scratch. It does not tell us how many of Brooklyn College's newest graduates will convert their degrees into stable career opportunities.</p>
        <blockquote className="pull-quote">
          Inflation tells us how quickly prices are changing. It does not tell us how much room people have left to adapt.
        </blockquote>
        <p>That is the issue I will continue watching through the remainder of 2026. Not only whether inflation rises or falls. But whether recent graduates are given enough genuine entry points to build a future while the cost of waiting continues to increase.</p>

        <hr className="my-8 opacity-20" />
        <h2>Update: What This Looks Like on the Ground in Brooklyn</h2>
        <p><em>Added June 18, 2026</em></p>
        <p>While the CPI tracks aggregate rent trends at the national level, a story out of Brooklyn this week illustrates how individual households can be paying above even those elevated market rates — not because of inflation, but because of deliberate enforcement failures.</p>
        <p>New York Attorney General Letitia James filed suit against two Brooklyn landlords: John Anderson, owner of 1075 Dean St. in Crown Heights, and Claudette Henry, owner of 134 Sackman St. in Brownsville. Both allegedly continued charging market-rate rents for units that were legally required to be registered as rent-stabilized — and never registered them with the state’s Department of Homes and Community Renewal. Tenants in those buildings were paying more than the law permitted, on top of everything else already rising.</p>
        <p>The suit also alleges that both landlords attempted to illegally evict tenants and harassed residents who sought the rent-stabilized leases they were entitled to. James is asking the court to force registration, offer new stabilized leases, and refund the overcharged tenants.</p>
        <p>This is worth noting alongside the inflation data because it adds a layer the CPI cannot capture. The Bureau of Labor Statistics measures what people are paying. It does not measure what they should have been paying, or how many households are absorbing costs they were never legally required to bear. When I wrote that inflation’s consequences are experienced personally, this is part of what that means. Two buildings in Brooklyn. Tenants who were already navigating a high-cost environment, paying even more than the market required because the system that was supposed to protect them was not enforced.</p>
        <p>The broader rent stabilization system in New York covers roughly one million units. How many of those units are similarly unregistered or misclassified is not publicly tracked in real time. The AG’s lawsuit is a signal, not a complete accounting.</p>
        <p><a href="https://www.instagram.com/p/DZtAcC1mcb6/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Source: Brooklyn Paper via Instagram, June 17, 2026</a></p>

        <hr className="my-8 opacity-20" />
        <p className="text-sm opacity-75"><strong>Sources and Further Reading:</strong></p>
        <ul className="text-sm opacity-75 space-y-1">
          <li><a href="https://www.bls.gov/news.release/cpi.nr0.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">U.S. Bureau of Labor Statistics, "Consumer Price Index — May 2026"</a></li>
          <li><a href="https://www.bls.gov/news.release/archives/cpi_07142006.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">U.S. Bureau of Labor Statistics, "Consumer Price Index — May 2006"</a></li>
          <li><a href="https://www.bls.gov/news.release/archives/cpi_08152008.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">U.S. Bureau of Labor Statistics, "Consumer Price Index — July 2008"</a></li>
          <li><a href="https://www.bls.gov/news.release/archives/cpi_01162009.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">U.S. Bureau of Labor Statistics, "Consumer Price Index — December 2008"</a></li>
          <li><a href="https://www.bls.gov/charts/consumer-price-index/consumer-price-index-by-category-line-chart.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">U.S. Bureau of Labor Statistics, "Consumer Price Index by Category"</a></li>
          <li><a href="https://www.bls.gov/news.release/archives/empsit_01092009.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">U.S. Bureau of Labor Statistics, "The Employment Situation — December 2008"</a></li>
          <li><a href="https://www.newyorkfed.org/research/college-labor-market/college-labor-market_compare-majors.html" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Federal Reserve Bank of New York, "The Labor Market for Recent College Graduates"</a></li>
          <li><a href="https://fcic-static.law.stanford.edu/cdn_media/fcic-reports/fcic_final_report_full.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Financial Crisis Inquiry Commission, "The Financial Crisis Inquiry Report"</a></li>
          <li><a href="https://www.federalreserve.gov/pubs/feds/2009/200956/200956pap.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Federal Reserve Board, "Federal Reserve Policies in the Financial Crisis"</a></li>
          <li><a href="https://www.brooklyn.cuny.edu/web/news/bcnews/bcnews_250527_commencement.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Brooklyn College, "Brooklyn College Celebrates Class of 2026 at 101st Commencement"</a></li>
          <li><a href="https://www.bis.org/publ/qtrpdf/r_qt2603u.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Bank for International Settlements, "Financing the AI Infrastructure Boom: On- and Off-Balance Sheet Borrowing," BIS Quarterly Review, March 2026</a></li>
          <li><a href="https://www.tiktok.com/@wallstreetjournal/video/7642397676524309773" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">The Wall Street Journal, "Job opportunities for college graduates have sputtered in recent years. But there are early signs entry-level hiring is picking up" — street interviews with Columbia University and NYU graduates, May 22, 2026</a></li>
        </ul>
      </>
    )
  },
  "ai-environmental-discrimination": {
    slug: "ai-environmental-discrimination",
    tag: "Finance Grind",
    title: "Has AI Made Environmental Degradation and Job Discrimination Worse?",
    date: "June 14, 2026",
    description: "Two viral videos — a sound meter held up to a data center in Michigan, and a Black IT professional with 13 years of experience saying racism cost her a better job — raise the same uncomfortable question: is AI making old problems worse?",
    seoKeywords: ["AI data center environmental impact", "data center noise pollution Michigan", "Hyperscale Data Inc Dowagiac", "AI hiring racial bias", "Black women tech jobs discrimination", "AI infrastructure community harm", "Meta Microsoft Google data center CapEx", "NVIDIA data center energy", "AI amplifying inequality", "AI environmental degradation 2026", "10-Q data center investment", "AI and environmental justice"],
    seoDescription: "A data center in Dowagiac, Michigan runs 24/7 at a volume measurable from a homeowner's porch. A Black IT professional with 13 years of experience says racism is keeping her out of higher-paying jobs. Both stories point to the same question: is AI making existing problems worse? Backed by SEC 10-Q filings from Meta, Microsoft, Alphabet, Amazon, and NVIDIA.",
    content: (
      <>
        <p>Two videos crossed my feed this week and I could not stop thinking about them together.</p>
        <p>The first was a 17-second clip from Dowagiac, Michigan. A person stood on their porch and held up a sound meter. Behind them, a 30 megawatt data center operated by Hyperscale Data Inc. hummed at a constant, measurable frequency. The caption read: "This is the sound emitted 24/7 from a 30 megawatt data center in Dowagiac, MI measured from a homeowner's porch." The description added that the company plans a substantial expansion and that multiple residents have already sued over the noise.</p>
        <p>The second was nearly three minutes long. A Black woman with over 13 years of IT experience and a military background looked directly into the camera and said racism was keeping her out of higher-paying jobs she was qualified for. She said she lost a position after posting a video. The title card on screen read: "RACISM IS KEEPING ME OUT OF HIGHER PAYING JOBS."</p>
        <p>Two different videos. Two different problems. But the same underlying question: is AI making things that were already bad even worse?</p>
        <h2>The Infrastructure Nobody Talks About</h2>
        <p>When people talk about AI, they tend to talk about outputs. Chatbots. Generated images. Automated reports. What they talk about less is what it takes to run those systems at scale.</p>
        <p>Data centers are the physical backbone of the AI economy. They require enormous amounts of electricity, water for cooling, and land. And they generate noise, heat, and emissions as byproducts of operation.</p>
        <p>The Dowagiac video is not an isolated incident. It is a window into a pattern that is playing out in communities across the country, often in places that do not have the political or economic power to push back effectively. A 30 megawatt facility running 24 hours a day, seven days a week, produces a constant acoustic footprint. For the people who live nearby, that is not an abstraction. It is the sound outside their window every night.</p>
        <p>Hyperscale Data Inc. plans to expand. That means the sound gets louder. The energy draw increases. The residents who have already filed lawsuits will have to keep fighting.</p>
        <p>This is what the environmental cost of AI looks like at the local level. Not a statistic in a sustainability report. A sound meter on a porch in Michigan.</p>
        <blockquote>The environmental cost of AI is not just carbon. It is noise, water, land, and the quality of life of people who live next to the infrastructure that powers it.</blockquote>
        <h2>What the SEC Filings Actually Say</h2>
        <p>The Dowagiac video shows one data center in one Michigan town. But the scale of what is being built across the country is visible in a different kind of document: the quarterly reports that major technology companies file with the Securities and Exchange Commission.</p>
        <p>In its most recent 10-Q, Meta disclosed that it anticipates making capital expenditures of approximately $125 billion to $145 billion in 2026, explicitly to support its AI efforts. In the first quarter alone, it spent $19 billion on purchases of property and equipment, primarily servers, data centers, and network infrastructure. It also holds a 20 percent membership interest in a data center campus in Louisiana, with committed funding of approximately $27 billion and a maximum exposure to loss of $45.99 billion. The filing lists energy availability as a direct business risk, noting that access to energy requirements is something the company cannot control.</p>
        <p>Microsoft's most recent 10-Q reported $84.7 billion in property and equipment additions over the nine months ending March 2026, with the company explicitly flagging power availability and land availability as constraints on its ability to expand data center capacity. Alphabet spent $35.7 billion on capital expenditures in the first quarter of 2026 alone, describing its data centers as critical infrastructure dependent on energy and water. Amazon's AWS segment grew infrastructure capital expenditures to a pace of more than $54 billion annualized, with the company noting it is building or planning to build data centers in every major geography.</p>
        <p>NVIDIA, which manufactures the chips that power all of these data centers, reported $75.2 billion in Data Center revenue in its most recent quarter, up 92 percent from the same period a year earlier. Its 10-Q risk factors state directly: "The availability of data centers, energy, and capital to support the buildout of NVIDIA AI infrastructure by our customers and partners is crucial, and any shortage of these and other necessary resources could impact our future revenue and financial performance." It also acknowledges that "expanding energy capacity to meet demand is a complex, multi-year process involving significant regulatory, technical, and construction challenges."</p>
        <p>None of these filings mention the residents of Dowagiac. None of them disclose the acoustic footprint of their facilities, the water drawn from local aquifers for cooling, or the noise complaints filed by people who live next to the infrastructure. What they do disclose is that the expansion is accelerating, that energy is a binding constraint, and that the companies are aware the buildout is complex and contested at the regulatory level. The community-level cost is real enough to generate lawsuits. It is not real enough to appear in a risk factor.</p>
        <blockquote>These companies disclose billions in data center investment to their shareholders. They do not disclose the sound meter on the porch in Michigan.</blockquote>

        <h2>Lowell, Massachusetts: When a City Pushes Back</h2>
        <p>Dowagiac is not alone. In Lowell, Massachusetts, a data center was built in a residential neighborhood and residents have been fighting it ever since. In May 2026, a group of Lowell residents filed what legal observers described as a first-of-its-kind lawsuit against state environmental regulators and the data center's owner. Their argument: the Massachusetts Department of Environmental Protection approved the facility's air quality permit without conducting a cumulative impacts analysis or a review under the Massachusetts Environmental Policy Act. In other words, regulators approved the facility without fully accounting for what it would add to an area that was already dealing with existing pollution burdens.</p>
        <p>The city responded. In June 2026, Lowell's city council passed a one-year moratorium on the construction or expansion of data centers within city limits — one of the first municipalities in the country to take that step. The moratorium was not a permanent ban. It was a pause, designed to give the city time to update its zoning laws before more facilities could be approved under rules that were written before anyone anticipated this level of demand.</p>
        <p>The Yale Environmental Justice Law and Advocacy Clinic is involved in the appeal. That a law school clinic focused on environmental justice is now litigating data center permits is a signal of how these disputes are being categorized: not as routine land use disagreements, but as questions about who bears the environmental cost of infrastructure that benefits people elsewhere.</p>

        <h2>The Federal Policy Behind the Speed</h2>
        <p>Understanding why communities like Lowell and Dowagiac are being overwhelmed requires understanding what is driving the pace of construction. The answer is not simply corporate ambition, though that is part of it. It is also federal policy.</p>
        <p>In January 2025, the Trump administration announced Stargate — a $500 billion AI infrastructure initiative involving OpenAI, SoftBank, Oracle, and others. The headline number circulated widely. What circulated less was the distinction between what the federal government is actually providing and what the private sector is committing. The majority of the Stargate figure represents private investment pledges, not direct government grants. What the federal government is contributing is something arguably more powerful: regulatory acceleration. Permitting fast-tracks, energy access prioritization, and the removal of environmental review requirements that would otherwise slow construction.</p>
        <p>The major hyperscalers — Microsoft, Meta, Google, Amazon — are funding their own buildouts from their own capital. Microsoft committed $80 billion to data center construction in 2025. Meta committed $65 billion. These are corporate capital expenditure decisions driven by competition for AI market position. But federal policy is making it faster and easier to execute them, which means the gap between when a facility is approved and when a community can respond has narrowed significantly.</p>
        <p>That is the tension Lowell's moratorium is trying to address. Federal policy is accelerating the buildout. Local zoning law was written for a different era. The moratorium is a city trying to insert a pause between those two speeds — to create enough time to write rules that reflect what is actually being built in its neighborhoods.</p>
        <p>The financial structure compounds this. As the BIS documented, hyperscalers are not just spending their own cash. They are issuing bonds, creating off-balance sheet joint ventures, and using special purpose entities to hold data center assets and raise private debt. The capital flowing into this infrastructure is enormous, it is moving fast, and the communities where it lands are not parties to any of the financial arrangements that govern it.</p>

        <h2>The Hiring Problem That Predates the Algorithm</h2>
        <p>The second video is about something different but equally structural.</p>
        <p>Racial discrimination in hiring is not new. What is new is the scale and speed at which it can now operate. AI screening tools, resume parsers, and algorithmic ranking systems are increasingly the first filter between a candidate and a human reviewer. And those systems are trained on historical data, which means they can encode and replicate the biases of the past at a much faster rate than any individual hiring manager.</p>
        <p>A 2025 study from the University of Melbourne found serious risks of discrimination against minority groups as AI screening tools become more widely adopted in hiring. A separate paper published on SSRN found that candidates using the same large language model as the evaluator were 23 to 60 percent more likely to be shortlisted in simulated hiring pipelines than equally qualified applicants submitting human-written resumes. The system was, in effect, rewarding familiarity with itself.</p>
        <p>For a Black woman with 13 years of IT experience and a military background, the barriers are not just algorithmic. They are cultural, institutional, and deeply personal. But the algorithm does not help. It adds another layer of filtering that she has to get through before anyone even reads her name.</p>
        <p>The National Employment Law Project documented in 2024 that Black women workers are systematically concentrated in lower-paying occupations and locked out of higher-paying ones. That is not a pipeline problem. That is a structural one. And AI hiring tools, without careful design and auditing, risk automating that structure rather than disrupting it.</p>
        <blockquote>AI does not create discrimination from scratch. It inherits it, scales it, and makes it harder to see because it looks like a neutral process.</blockquote>
        <h2>The Same Expansion, Two Different Costs</h2>
        <p>What connects these two videos is not just AI. It is the question of who bears the cost of rapid technological expansion and who gets to benefit from it.</p>
        <p>The residents of Dowagiac did not ask for a data center next door. They are absorbing the noise, the energy demand, and the disruption so that somewhere else, a company can run its models faster. The expansion benefits the company and its clients. The cost lands on the neighborhood.</p>
        <p>The Black IT professional with 13 years of experience did not ask to be screened out by a system that was not built with her in mind. She built her qualifications over more than a decade, including military service. The AI economy is growing. The demand for IT talent is real. But the systems standing between her and the roles she is qualified for were not designed to see her clearly.</p>
        <p>These are not edge cases. They are patterns. And the pattern is that AI infrastructure tends to externalize its costs onto communities and individuals who already have less power to absorb them.</p>
        <DataCenterMap />
        <h2>The Jobs That Were Promised and the Jobs That Showed Up</h2>
        <p>One of the most consistent arguments made to communities like Dowagiac is that data centers bring jobs. Local officials are told to expect economic development. Tax incentives are approved. Expansion permits are granted. And then the community waits for the jobs that were promised.</p>
        <p>The reality, documented by Brookings, Good Jobs First, and independent economists, is that those jobs rarely materialize in the way communities expect — and when they do, they often do not go to local residents.</p>
        <p>Hyperscale Data Inc. operates its Dowagiac facility as a colocation center — it rents out computing space to remote clients who run their own workloads from wherever they happen to be. That business model matters enormously for local employment. The Brookings Institution's May 2026 study on data center employment drew a sharp distinction between hyperscale campuses (built by Amazon, Google, and Microsoft to run their own operations) and colocation facilities (built by landlords who lease space to outside tenants). Hyperscale campuses tend to generate meaningful local IT sector growth because they bring operational presence with them. Colocation facilities do not, because the tenants are remote. The company whose servers sit in a rack in Dowagiac has no reason to hire anyone in Dowagiac.</p>
        <p>The permanent jobs that do exist at these facilities require specialized skills, and those workers rarely come from the surrounding community. Good Jobs First documented that data center construction crews are largely itinerant — skilled tradespeople who follow the projects, not the geography. A Stream US Data Centers project in Genesee County, New York projected that roughly six in ten of its construction workers would be brought in from outside the 14-county region. In Columbus, Ohio, a Cologix facility tracked its construction employment and found the average worker stayed on site for about six weeks before moving on. The build ends. The workers leave. The community is left with the facility but not the workforce.</p>
        <p>The job quality picture is equally difficult to defend. Good Jobs First reviewed a developer application for a North Carolina data center and found that out of 69 total permanent positions, 25 were security and janitorial roles — not the tech jobs the industry tends to advertise. A former data center technician who spoke publicly about the work described making $15 an hour. In Wyoming, state data showed that more than a third of data center employees were classified as unskilled workers, earning roughly half what the skilled workers at the same facilities made. And the subsidy structure that enables all of this is remarkably permissive: nearly half of all state data center tax incentive programs — 16 out of 36 — do not require companies to create any jobs at all in exchange for the public money they receive.</p>
        <p>The subsidy math is particularly hard to defend once you look at the numbers. Virginia's data center tax exemption cost the state an estimated $1.6 billion in a single fiscal year. In New York, one facility negotiated $1.4 billion in public subsidies against a commitment of 125 jobs — a ratio that works out to roughly $11 million for every position promised. Economist Michael Hicks studied data center development across Texas and concluded that the headline job numbers are largely illusory: workers shift from one sector to another rather than new employment being created, leaving no meaningful net gain for the regional economy.</p>
        <p>Dr. Khalil Shahyd of the Natural Resources Defense Council put it plainly at the NWF's 2026 roundtable: data centers typically create 20 to 25 middle-class positions, which then support low-wage service workers. "The jobs that data center companies are creating are not quality jobs. They are not living wage jobs. And that is not economic development."</p>
        <blockquote>The community absorbs the noise, the energy strain, the infrastructure pressure, and the land loss. The jobs that do exist go to specialists who were already working in the industry elsewhere.</blockquote>
        <h2>What This Means for How We Think About AI</h2>
        <p>I am not arguing that AI is inherently destructive. I use it. I write about it. I think about it constantly as someone trying to build a career at the intersection of finance and technology.</p>
        <p>But I do think we have a habit of evaluating AI by its best outputs and ignoring its worst externalities. We celebrate the productivity gains and look away from the porch in Michigan. We talk about AI democratizing opportunity and do not reckon with the woman on camera who has 13 years of experience and cannot get through the door.</p>
        <p>The Bloomberg analysis from December 2024 found that corporate America hired more Black workers in 2020 and 2021 and then largely stopped. The momentum did not hold. If AI hiring tools are now doing the screening, and those tools were trained on data from before the brief window of increased diversity hiring, then the technology may be locking in a regression rather than sustaining progress.</p>
        <p>That is worth taking seriously. Not because AI is the villain of the story, but because the story is more complicated than the press releases suggest.</p>
        <p>Environmental degradation and job discrimination did not start with AI. But AI is scaling them. And scale changes the nature of a problem.</p>
        <blockquote>Sometimes the most important question is not what a technology can do. It is what it is doing to the people who did not choose to be part of the experiment.</blockquote>
        <h2>Sources and Further Reading</h2>
        <ul>
          <li><a href="https://www.tiktok.com/@ayathetigress/video/7650601803972627726" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">@ayathetigress, TikTok — Dowagiac data center noise video (Hyperscale Data Inc.)</a></li>
          <li><a href="https://www.tiktok.com/@iiamkee21/video/7650474787621326094" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">@iiamkee21, TikTok — "Racism is keeping me out of higher paying jobs"</a></li>
          <li><a href="https://pursuit.unimelb.edu.au/articles/discrimination-by-recruitment-algorithms-is-a-real-problem" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">University of Melbourne, "Discrimination by recruitment algorithms is a real problem" (2025)</a></li>
          <li><a href="https://www.nelp.org/insights-research/occupational-segregation-of-black-women-workers-in-the-u-s/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">National Employment Law Project, "Occupational Segregation of Black Women Workers in the U.S." (2024)</a></li>
          <li><a href="https://www.bloomberg.com/graphics/2024-anti-dei-corporate-america-stalls-black-workers-gains/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Bloomberg, "Corporate America Hired More Black Workers. Then It Stopped." (December 2024)</a></li>
          <li><a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4682602" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Xu, Li & Jiang, "AI Self-preferencing in Algorithmic Hiring" (SSRN)</a></li>
          <li><a href="https://www.sec.gov/Archives/edgar/data/1326801/000162828026028526/meta-20260331.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Meta Platforms, Inc. — Form 10-Q, Q1 2026 (SEC EDGAR)</a></li>
          <li><a href="https://www.sec.gov/Archives/edgar/data/789019/000119312526191507/msft-20260331.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Microsoft Corporation — Form 10-Q, Q3 FY2026 (SEC EDGAR)</a></li>
          <li><a href="https://www.sec.gov/Archives/edgar/data/1652044/000165204426000048/goog-20260331.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Alphabet Inc. — Form 10-Q, Q1 2026 (SEC EDGAR)</a></li>
          <li><a href="https://www.sec.gov/Archives/edgar/data/1018724/000101872426000014/amzn-20260331.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Amazon.com, Inc. — Form 10-Q, Q1 2026 (SEC EDGAR)</a></li>
          <li><a href="https://www.sec.gov/Archives/edgar/data/1045810/000104581026000052/nvda-20260426.htm" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">NVIDIA Corporation — Form 10-Q, Q1 FY2027 (SEC EDGAR)</a></li>
          <li><a href="https://goodjobsfirst.org/will-data-center-job-creation-live-up-to-hype-i-have-some-concerns/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Good Jobs First, "Will data center job creation live up to hype?" (March 2026)</a></li>
          <li><a href="https://www.brookings.edu/articles/new-evidence-on-data-center-employment-effects/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Brookings Institution, "New evidence on data center employment effects" (May 2026)</a></li>
          <li><a href="https://www.brookings.edu/articles/local-implications-data-centers-rural-communities-us/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Brookings Institution, "The local implications of data centers for rural communities in the US" (March 2026)</a></li>
        </ul>
      </>
    )
  },

  'warsh-fed-chair': {
    slug: 'warsh-fed-chair',
    title: 'The New Fed Chair Wants Rates Low. His Own Standard Says Otherwise.',
    tag: 'Finance Grind',
    date: 'June 16, 2026',
    description: 'Kevin Warsh replaced Jerome Powell as Fed Chair on May 22, 2026. He wants lower rates. But his own definition of price stability might keep them high longer than anyone expects.',
    seoKeywords: ['Kevin Warsh Fed Chair', 'Jerome Powell replacement', 'Federal Reserve 2026', 'interest rates 2026', 'Fed inflation policy', 'Kevin Warsh price stability', 'Fed independence Trump', 'mortgage rates 2026', 'Fed balance sheet', 'rate cuts 2026'],
    seoDescription: 'Kevin Warsh replaced Jerome Powell as Federal Reserve Chair on May 22, 2026. His 18-word definition of price stability may keep interest rates elevated longer than expected — and what that means for mortgages, loans, and the economy.',
    content: (
      <>
        <p>On May 22, 2026, Kevin Warsh was sworn in as the 17th Chair of the Federal Reserve at the White House, with Supreme Court Justice Clarence Thomas administering the oath. Jerome Powell, who had held the position since 2018, was out. The era of the Fed that navigated a pandemic, a 40-year inflation high, and the fastest rate-hiking cycle in modern history was officially over.</p>
        <p>The official story is simple: Donald Trump wanted lower interest rates, Powell would not deliver them fast enough, and so Trump replaced him with someone he trusted to move in that direction. Kevin Warsh — former Fed governor, financier, attorney, and son-in-law to the Estée Lauder family — was confirmed by the Senate 54 to 45 in April 2026 and took the chair six weeks later.</p>
        <p>But the actual story is more complicated. And if you are someone trying to buy a home, carry a credit card balance, or plan a career in finance, the complication matters.</p>
        <h2>Who Is Kevin Warsh?</h2>
        <p>Warsh is not a stranger to the Fed. He served as a Fed governor from 2006 to 2011, appointed by George W. Bush. He was in the room during the 2008 financial crisis, and during that period he was known as a rate hawk — someone who prioritized fighting inflation over stimulating growth. He was skeptical of the Fed's quantitative easing programs and was an early critic of the balance sheet expansion that followed the crisis.</p>
        <p>After leaving the Fed, he spent years at the Hoover Institution and in private finance. He became a vocal critic of what he called the Fed's overreach — its communication style, its balance sheet size, and what he saw as its drift into areas beyond its core mandate. When Trump nominated him in January 2026, the financial press described him as someone who would reshape the institution from the inside.</p>
        <p>Trump's stated reason for wanting Warsh was straightforward: he believed Powell was too slow to cut rates. The economy was slowing, tariffs were adding inflationary pressure, and Trump wanted cheaper borrowing costs. Warsh, he believed, would deliver.</p>
        <h2>The 18 Words That Change Everything</h2>
        <p>Here is where the story gets interesting. During his Senate Banking Committee confirmation testimony in April 2026, Warsh was asked to define price stability. His answer was 18 words long: <em>"I believe that price stability should be a change in prices such that no one's talking about it."</em></p>
        <p>Read that again. Not 2% inflation. Not a specific target. Price stability, in Warsh's framework, is achieved when the public has stopped paying attention to prices altogether. That is a perception-based standard, not a numerical one.</p>
        <p>As of June 2026, inflation is running at 3.8% — a three-year high, up from 3.3% in March. People are very much still talking about prices. Under Warsh's own definition, the Fed's work is not done. And if the work is not done, rates do not come down.</p>
        <blockquote>The man Trump picked to lower rates has defined price stability in a way that could justify keeping them high longer than Powell ever did.</blockquote>
        <h2>The Balance Sheet Problem</h2>
        <p>Warsh also wants to shrink the Fed's balance sheet, which currently sits at $6.7 trillion. The Fed has been running quantitative tightening — selling off assets it accumulated during the pandemic — but Warsh wants to accelerate that process. A smaller balance sheet means less money in the financial system, which is another form of tightening, even if the policy rate itself stays flat or falls slightly.</p>
        <p>His argument is that deregulation and federal spending cuts will bring inflation down on their own, creating space for rate reductions. That is a theory. It depends on Congress, on trade policy, and on an economy that is currently absorbing tariff shocks and a slowing labor market simultaneously.</p>
        <h2>What the Political Pressure Actually Does</h2>
        <p>The Equitable Growth Institute published an analysis in May 2026 that is worth reading carefully. Their research found that political pressure on the Federal Reserve from the president has been shown empirically to increase inflation with no positive impact on economic growth. The mechanism is straightforward: when markets believe the Fed is operating under political influence rather than independent judgment, they price in higher inflation expectations. Those expectations become self-fulfilling.</p>
        <p>Elizabeth Warren called Warsh Trump's "sock puppet" during the confirmation hearings. That framing is partisan, but the underlying concern is not. The Fed's credibility as an independent institution is itself an inflation-fighting tool. If markets stop believing the Fed will act against inflation when it needs to, inflation becomes harder to control regardless of what the policy rate actually is.</p>
        <h2>What This Means If You Are Not a Hedge Fund Manager</h2>
        <p>If Warsh holds rates high to restore what he calls price stability — meaning inflation so low that no one is discussing it — then mortgages stay expensive, car loans stay expensive, and credit card rates stay elevated. The 30-year fixed mortgage rate has been above 6.5% for most of the past two years. That is not a number that changes quickly even when the Fed does cut, because long-term rates respond to inflation expectations, not just the overnight rate.</p>
        <p>If Warsh cuts prematurely because of political pressure, and inflation reaccelerates, the Fed will have to raise rates again — harder and faster than if it had waited. That is the scenario that historically does the most damage to working-class and middle-class households, who carry the most variable-rate debt and have the least cushion to absorb a second shock.</p>
        <p>For anyone entering the workforce or the housing market in 2026, the Warsh era is not a clean story of lower rates ahead. It is a story about a man whose stated philosophy and his political patron's demands are in direct tension — and the resolution of that tension will play out in the cost of every loan, every lease, and every credit card statement for the next several years.</p>
        <blockquote>The Fed chair who was supposed to bring rates down may have just set a standard that keeps them elevated longer than the chair he replaced.</blockquote>
        <h2>Sources</h2>
        <ul>
          <li><a href="https://247wallst.com/investing/2026/05/31/18-words-from-fed-chair-kevin-warsh-that-could-keep-interest-rates-higher-for-years/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">247 Wall St., "18 Words From Fed Chair Kevin Warsh That Could Keep Interest Rates Higher for Years" (May 31, 2026)</a></li>
          <li><a href="https://equitablegrowth.org/what-is-the-relationship-between-inflation-interest-rates-and-economic-growth-and-what-does-it-mean-for-the-new-federal-reserve-chair/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Washington Center for Equitable Growth, "What is the relationship between inflation, interest rates, and economic growth, and what does it mean for the new Federal Reserve chair?" (May 18, 2026)</a></li>
          <li><a href="https://www.cbsnews.com/news/kevin-warsh-sworn-in-federal-reserve-chair/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">CBS News, "Kevin Warsh sworn in as new Fed chair at White House" (May 22, 2026)</a></li>
          <li><a href="https://thehill.com/business/5310069-5-big-obstacles-kevin-warsh-faces-as-federal-reserve-chair/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">The Hill, "5 big obstacles Kevin Warsh faces as Federal Reserve chair" (May 21, 2026)</a></li>
        </ul>
      </>
    )
  },

  'safety-nets-middle-class': {
    slug: 'safety-nets-middle-class',
    title: 'I Argued With My Professor About Safety Nets Two Years Ago. The Data Proved Me Right.',
    tag: 'Finance Grind',
    date: 'June 16, 2026',
    description: 'Two years ago I argued in my microeconomics class that safety nets for working-class families are an extreme necessity. My professor pushed back. Here is what the data says now.',
    seoKeywords: ['shrinking middle class 2024', 'safety nets working class', 'NYC cost of living 2026', 'commercial rent NYC small business', 'cost of living domino effect', 'housing cost burden renters', 'middle class income share', 'Pew Research middle class', 'affordable housing shortage', 'Brooklyn cost of living'],
    seoDescription: 'The American middle class has shrunk from 61% to 51% of the population since 1971. Commercial rents, housing costs, and the cost-of-living domino effect explain why safety nets are an economic necessity — not a political preference.',
    content: (
      <>
        <p>Two years ago I was sitting in my microeconomics class making an argument that did not go over well. I said that safety nets for low-income and working-class families are not a luxury or a political preference — they are a structural necessity, because the middle class is shrinking and the cost pressures driving that shrinkage are not random. They are the predictable result of how costs cascade through a congested, high-rent economy.</p>
        <p>My professor pushed back. The standard economic response: markets correct, wages adjust, the system is more resilient than you think. I was not convinced then. I am less convinced now.</p>
        <h2>The Numbers on the Middle Class</h2>
        <p>In 1971, 61% of Americans lived in middle-class households. By 2023, that share had fallen to 51%, according to Pew Research Center's analysis of government data. That is a ten-percentage-point decline over five decades, and the direction has not reversed.</p>
        <p>The income picture is more revealing than the headcount. The middle class's share of total U.S. household income fell from 62% in 1970 to 43% in 2022. Upper-income households, meanwhile, went from holding 29% of aggregate income to 48% over the same period. The middle class did not just shrink in population — it lost its proportional claim on the economy's output.</p>
        <p>What is often left out of this conversation is the lower-income share. The percentage of Americans in lower-income households grew from 27% in 1971 to 30% in 2023. The people who were supposed to move up into the middle class are instead staying put or moving down. And the people already in the middle class are increasingly vulnerable to falling into the lower tier.</p>
        <blockquote>The middle class is not just smaller. It is holding a smaller share of a larger economy, and the gap between what it earns and what it costs to live is widening.</blockquote>
        <h2>The Domino Effect I Was Describing</h2>
        <p>Here is the argument I was making in that classroom, and it was not abstract. It starts with commercial rent.</p>
        <p>New York State has no law limiting how much a landlord can raise commercial rent. None. Landlords and tenants negotiate freely, which means that in a market like New York City — where demand for retail and office space is intense and supply is constrained — commercial rents can and do increase dramatically at lease renewal. In mid-2023, 55% of commercial tenants reported facing rent increases. The NYC Small Business Rent Stabilization Act, which would cap those increases, was introduced in the State Senate in 2025 and is still pending.</p>
        <p>When a small business owner's rent goes up by 30% at renewal, that cost does not disappear. It gets passed to the customer. The coffee shop charges more for a latte. The dry cleaner raises its prices. The bodega adjusts its margins. The restaurant adds a service fee. Every business in the supply chain that is absorbing higher costs — sourcing, shipping, labor, insurance, utilities — does the same calculation and arrives at the same answer: raise prices or close.</p>
        <p>In a city where the cost of living is already 79% higher than the national average, and where housing alone is 230% more expensive than the national average, those price increases land on households that have almost no margin left. A family of four in New York City faces estimated monthly costs of over $6,200 before rent is even counted, according to Numbeo's June 2026 data. The United Way of New York City's True Cost of Living measure — which accounts for housing, food, healthcare, childcare, transportation, taxes, clothing, and other basics — documents what it actually costs to meet a family's needs in this city. The number is not comfortable.</p>
        <h2>The Rent Burden Reality</h2>
        <p>The housing data makes the domino effect concrete. In 2019, nearly half of all renter households in the United States were cost-burdened, meaning they were spending more than 30% of their income on housing. That was before the pandemic-era rent surge. By 2023, the number of cost-burdened renter households had hit a record high, according to Harvard's Joint Center for Housing Studies.</p>
        <p>The National Low Income Housing Coalition's 2026 Gap Report found a shortage of more than 7.2 million rental homes that are affordable and available to extremely low-income renters. That shortage does not resolve itself through market forces when the economics of building affordable housing in high-cost cities do not pencil out for developers. The gap persists and widens.</p>
        <p>What is striking is that the cost burden is no longer limited to the lowest earners. Renters making between $45,000 and $74,999 per year — a range that covers a significant portion of working-class and lower-middle-class households — saw their cost burden rate grow by four percentage points between 2022 and 2024. Forty-one percent of households in that income range were cost-burdened. That is not a poverty story. That is a structural story about what happens when housing costs outpace income growth across the income distribution.</p>
        <h2>Why Safety Nets Are Not a Charity Argument</h2>
        <p>The argument I was making in that microeconomics class was not that safety nets are a moral good, though I believe they are. It was that they are economically rational given the structure of the cost cascade I just described.</p>
        <p>When a working-class family in Brooklyn is spending 45% of its income on rent, 15% on transportation, and the rest on food, utilities, and childcare, there is no margin for a medical bill, a car repair, or a job loss. Without a safety net, a single shock — one that a middle-class family with savings could absorb — becomes a spiral. The family falls behind on rent. The kids miss school. The parent takes a second job that conflicts with the first. The household's economic stability collapses not because of bad decisions but because the system left no room for error.</p>
        <p>The counterargument — that markets will correct, that wages will rise to meet costs — assumes a labor market that responds faster than the cost increases accumulate. In New York City, the minimum wage reached $16 per hour in 2024. The United Way's True Cost of Living for a single adult in NYC requires significantly more than that to cover basic needs. The wage adjustment has not kept pace with the cost structure.</p>
        <p>Immigrants, who make up about 14% of the U.S. population, face this pressure disproportionately. Pew's data shows that 36% of immigrants live in lower-income households, compared to 29% of the U.S. born. In a city like New York, where immigrant labor powers entire industries — food service, construction, healthcare, domestic work — the absence of adequate safety nets does not just harm those families. It destabilizes the labor supply that the rest of the economy depends on.</p>
        <blockquote>A safety net is not a subsidy for failure. It is the infrastructure that keeps a cost-pressured economy from cannibalizing its own workforce.</blockquote>
        <h2>What I Would Tell That Professor Now</h2>
        <p>The markets-correct argument assumes that the people absorbing the cost increases have the time and resources to wait for the correction. Most of them do not. The correction, when it comes, often arrives after the household has already been displaced, the business has already closed, or the child has already fallen behind in school.</p>
        <p>The middle class is shrinking not because people are making worse decisions than they did in 1971. It is shrinking because the cost structure of living in a productive, congested economy has outrun the income growth available to the people who do the work that makes that economy function. Safety nets are what you build when you acknowledge that gap honestly and decide to do something about it instead of waiting for a correction that arrives too late for the people who needed it most.</p>
        <p>I still think I was right in that classroom. The data has not given me a reason to change my mind.</p>
        <h2>Sources</h2>
        <ul>
          <li><a href="https://www.pewresearch.org/race-and-ethnicity/2024/05/31/the-state-of-the-american-middle-class/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Pew Research Center, "The State of the American Middle Class" (May 2024)</a></li>
          <li><a href="https://nlihc.org/gap" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">National Low Income Housing Coalition, "The Gap: A Shortage of Affordable Homes" (2026)</a></li>
          <li><a href="https://www.jchs.harvard.edu/blog/renters-affordability-challenges-worsened-last-year" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Harvard Joint Center for Housing Studies, "Renters' Affordability Challenges Worsened Last Year" (December 2024)</a></li>
          <li><a href="https://unitedwaynyc.org/true-cost-of-living/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">United Way of New York City, "True Cost of Living" (2024)</a></li>
          <li><a href="https://www.numbeo.com/cost-of-living/in/New-York" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Numbeo, "Cost of Living in New York, New York" (June 2026)</a></li>
          <li><a href="https://www.rentcafe.com/cost-of-living-calculator/us/ny/new-york-city/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">RentCafe, "Cost of Living in New York City, NY" (2026)</a></li>
          <li><a href="https://www.nysenate.gov/legislation/bills/2025/S8319" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">New York State Senate Bill S8319, "Small Business Rent Stabilization Act" (2025)</a></li>
        </ul>
      </>
    )
  },
  "from-fashion-to-finance": {
    slug: "from-fashion-to-finance",
    tag: "Finance Grind",
    title: "What Learning Finance Has Actually Taught Me So Far",
    date: "December 2025",
    description: "My path into finance didn't start with stock charts or investment textbooks. It started at a fashion event in New York City — and a realization that changed everything.",
    seoKeywords: ["finance career path", "fashion to finance", "JPMorgan internship", "EY international transaction services", "Brooklyn College finance", "finance major journey", "global markets career", "finance and fashion", "Prabal Gurung", "investment banking path"],
    seoDescription: "How a fashion event in New York City led to a finance career — from a Prabal Gurung store opening to JPMorgan Private Bank, EY International Transaction Services, and Brooklyn College. A personal story about finding your place in global markets.",
    content: (
      <>
        <p>My path into finance didn't start with stock charts or investment textbooks.</p>
        <p>It started at a fashion event in New York City.</p>
        <p>I had originally planned to study fashion design. I loved the creativity, the storytelling, and the culture around fashion. At the time, I imagined my future somewhere inside that industry — designing, producing, or contributing to the world of fashion.</p>
        <p>But everything shifted the night I attended the grand opening of Prabal Gurung's flagship store in New York.</p>
        <p>It was my first real exposure to the professional fashion world. The room was full of designers, stylists, brand executives, investors, and industry insiders. I remember listening to conversations about collections, brand growth, and the business side of fashion.</p>
        <p>And that's when something clicked.</p>
        <h2>The Realization: Fashion Is Also Finance</h2>
        <p>Before that event, I had misunderstood what it meant to study fashion.</p>
        <p>I thought the industry revolved mostly around creativity and design. But after speaking with seasoned professionals that night, I realized something important: fashion is one of the largest global industries in the world, and it runs on capital.</p>
        <ul>
          <li>Launching collections requires funding.</li>
          <li>Producing garments requires supply chains.</li>
          <li>Retail expansion requires investment.</li>
          <li>Global brands rely on complex financial planning.</li>
        </ul>
        <p>Behind every runway show is an enormous financial system.</p>
        <p>And something else stood out to me. Many of the professionals who loved fashion the most — the ones attending events, supporting brands, and engaging deeply with the industry — were actually finance professionals. They were investors, analysts, and executives whose work helped fund and sustain the industry.</p>
        <p>That realization changed how I saw my own future.</p>
        <h2>COVID-19 and a Turning Point</h2>
        <p>Not long after that event, the world changed.</p>
        <p>The COVID-19 pandemic disrupted nearly every industry, including fashion. Global supply chains froze, retail stores closed, and businesses everywhere were forced to rethink how they operated.</p>
        <p>For me, that moment became an opportunity to rethink my own direction.</p>
        <p>Instead of pursuing fashion design directly, I began exploring the financial systems that power industries like fashion — how companies raise capital, how markets allocate resources, how businesses expand globally. Finance suddenly felt like the framework connecting everything I was curious about.</p>
        <h2>My First Step Into Finance</h2>
        <p>By 2021, I secured my first internship at JPMorgan Private Bank in Dallas as an Investment, Wealth, and Asset Management intern.</p>
        <p>It was my first real experience inside the financial world. Private banking introduced me to how wealth is managed, how portfolios are constructed, and how financial institutions advise clients on long-term strategies. I began to see finance not just as theory, but as a system that shapes real decisions and real outcomes.</p>
        <h2>Expanding My Perspective</h2>
        <p>A couple of years later, I transferred to Brooklyn College to formally study finance.</p>
        <p>By the summer of 2023, I landed another major opportunity — an internship with EY in International Transaction Services. That experience broadened my understanding even further. Instead of focusing on individual portfolios, I began learning about global markets, multinational corporations, cross-border transactions, and the strategic financial decisions made by large organizations. It showed me how interconnected the global economy really is.</p>
        <h2>Finding My Place in Finance</h2>
        <p>Since that first fashion event, my journey through finance has been about discovering where my curiosity fits inside this enormous field.</p>
        <p>Finance touches everything: global trade, technology, insurance markets, capital allocation, economic development. And the more I learn, the more I realize that finance is not just about money.</p>
        <p>It's about understanding the systems that move the world forward.</p>
      </>
    )
  },
  "r-for-finance": {
    slug: "r-for-finance",
    tag: "Finance Grind",
    title: "Learning R for Finance Without Crying",
    date: "December 2025",
    description: "Bootstrapping, yield curves, Nelson\u2013Siegel models \u2014 and a career crisis I didn't see coming. What an R class taught me about data, finance, and where I actually want to go.",
    seoKeywords: ["learning R for finance", "R programming finance student", "quantitative finance career", "data analysis finance major", "R studio finance", "finance and data science", "AI fellowship finance", "Beats by Dre data analyst", "PwC data analysis", "finance vs data science career"],
    seoDescription: "I signed up for an R class expecting to hate it. Instead it changed how I thought about data, finance, and my own career. A finance student's honest account of learning R \u2014 the confusion, the breakthroughs, and the unexpected identity crisis that followed.",
    content: (
      <>
        <p>I signed up for my financial econometrics class expecting to survive it.</p>
        <p>Not enjoy it. Not find it interesting. Just get through it.</p>
        <p>R had a reputation. People in my program talked about it the way you talk about a difficult professor \u2014 with a mix of respect and dread. The syntax was unfamiliar. The error messages were cryptic. And the learning curve felt steep, especially for someone who had spent most of their finance education thinking in spreadsheets.</p>
        <p>But I needed the credit. So I sat down, opened RStudio, and started.</p>

        <h2>The First Few Weeks</h2>
        <p>The early weeks were humbling.</p>
        <p>R doesn't work the way Excel does. There's no clicking around to find what you need. You have to tell the program exactly what you want, in the right syntax, in the right order. One misplaced bracket or misspelled variable name and nothing runs.</p>
        <p>I spent a lot of time staring at error messages I didn't understand. I spent even more time on Stack Overflow trying to figure out what those messages meant.</p>
        <p>But slowly, things started to make sense.</p>
        <p>The logic of the language began to feel less foreign. I started recognizing patterns in how functions worked. I got faster at reading error messages and diagnosing what went wrong.</p>

        <h2>What We Actually Built</h2>
        <p>The class covered a lot of ground. We worked with real financial data \u2014 pulling interest rate series, running regressions, and building models that connected theory to actual market behavior.</p>
        <p>Some of the most interesting work involved yield curve modeling. We used bootstrapping techniques to extract zero-coupon rates from bond prices, then applied the Nelson\u2013Siegel model to fit and interpret the shape of the yield curve. These aren't abstract exercises \u2014 central banks, fixed income desks, and risk managers use these exact frameworks to understand where interest rates are and where they might be going.</p>
        <p>Working through those models in R made them feel real in a way that reading about them in a textbook never did.</p>

        <h2>What Finally Made R Click For Me</h2>
        <p>The turning point wasn't a single assignment. It was the moment I stopped thinking of R as a tool I was being forced to use and started thinking of it as a language I was learning to speak.</p>
        <p>Once that shift happened, everything felt different. I started experimenting beyond what was required. I'd finish an assignment and then try to extend it \u2014 visualizing the output differently, testing what happened when I changed the parameters, asking questions the assignment hadn't asked.</p>
        <p>That curiosity was new for me in a technical context. And it mattered.</p>

        <h2>The Unexpected Career Crisis</h2>
        <p>What surprised me most wasn't learning R itself \u2014 it was discovering how much I enjoyed working with data.</p>
        <p>Before this class, I viewed data as something necessary. After this class, I started viewing it as something interesting.</p>
        <p>I genuinely enjoyed digging through datasets, identifying patterns, testing assumptions, and trying to understand what the numbers were actually saying. For the first time, I wasn't just looking for the right answer \u2014 I was interested in the process of finding it.</p>
        <p>That realization followed me beyond the classroom.</p>
        <p>As I moved into experiences with PwC and later worked on consumer insights and qualitative data analysis projects with Beats by Dre, I found myself gravitating toward the analytical side of the work. I enjoyed taking large amounts of information and turning them into stories, recommendations, and decisions.</p>
        <p>Looking back, this class played a major role in why I became interested in AI fellowships, data analyst roles, and opportunities that sat at the intersection of technology, business, and decision-making.</p>
        <p>But there was a catch.</p>
        <p>The more I enjoyed data, the more I started feeling like I was drifting away from finance. And honestly, that was uncomfortable.</p>
        <p>I had worked hard to get into finance. I transferred schools, landed internships, and spent years trying to find my place in the industry. Suddenly, I was becoming more excited about datasets, coding, and AI than I was about some of the traditional finance roles I saw around me.</p>
        <p>For a while, I started looking into quantitative finance roles. From the outside, they seemed like the perfect combination of finance, mathematics, and technology. I thought maybe quant could be the answer.</p>
        <p>But the deeper I researched the field, the more I realized how specialized it was. Many quant roles are designed for students coming from mathematics, computer science, physics, statistics, or engineering backgrounds. As a finance student at a public university, it often felt like I was standing outside a room that everyone else had been preparing to enter for years.</p>
        <p>People would tell me that I should pursue a master's degree if I wanted to be competitive.</p>
        <p>At the same time, I was beginning to realize something important: the portfolio management and investment roles that many of my professors loved weren't necessarily the roles that excited me most.</p>
        <p>What interested me was understanding systems. How markets work. How businesses make decisions. How technology changes industries. How data influences outcomes. How people interact with the systems around them.</p>
        <p>Eventually, I realized that learning R hadn't pushed me away from finance at all. It had expanded my understanding of what a finance career could be.</p>
        <p>Instead of choosing between finance and technology, I started looking for ways to combine them.</p>

        <h2>Why You Should Stick With It</h2>
        <p>If you're a finance student who just started learning R and you're currently in the "this is impossible" phase \u2014 I understand. That phase is real.</p>
        <p>But here's what I'd tell you: the discomfort is part of the process. R is hard at first because it requires a different kind of thinking. You're not just entering data \u2014 you're writing instructions for a machine to follow. That's a skill, and like any skill, it gets easier with repetition.</p>
        <p>More importantly, the ability to work with data is becoming one of the most valuable things a finance professional can bring to any role. Whether you end up in investment banking, corporate finance, risk management, or somewhere at the intersection of finance and technology \u2014 knowing how to analyze data programmatically will set you apart.</p>
        <p>Stick with it. The payoff is real.</p>

        <h2>Where I Am Now</h2>
        <p>I'm not a computer science student. I'm not a mathematician. I'm a finance student who became fascinated by data, AI, and the systems that drive decisions.</p>
        <p>And surprisingly, it all started with an R class that I originally thought I was going to hate.</p>
        <p>That's still the journey I'm on today \u2014 figuring out how to combine the financial thinking I've spent years building with the analytical tools that keep pulling my attention forward.</p>
      </>
    )
  },
  "war-risk-insurance-lloyds": {
    slug: "war-risk-insurance-lloyds",
    tag: "Finance Grind",
    title: "How War-Risk Insurance Actually Works (Inside the Lloyd's Market)",
    date: "March 2026",
    description: "Why ships need war-risk insurance, why premiums spike during conflict, and how Lloyd's of London became the center of global maritime risk.",
    seoKeywords: ["war risk insurance explained", "Lloyd's of London how it works", "marine insurance war exclusion", "shipping insurance geopolitics", "Aon marine insurance", "war risk premium spike", "maritime insurance syndicates", "government shipping insurance", "global trade insurance", "insurance broking explained"],
    seoDescription: "None of the ships that carry global trade move without insurance. War-risk insurance is the layer that covers what standard policies won't — and when it disappears, trade stops. A breakdown of how Lloyd's of London, brokers like Aon, and governments hold the system together.",
    content: (
      <>
        <p>If you zoom out and look at global trade, the ocean looks like a massive highway system. Oil tankers moving through the Persian Gulf. Container ships crossing the Pacific. Bulk carriers hauling grain across the Atlantic.</p>
        <p>But none of those ships move without insurance.</p>
        <p>Ports require it. Lenders require it. Shipping companies require it.</p>
        <p>And one of the most important forms of coverage is war-risk insurance.</p>

        <h2>The Basic Idea Behind Marine Insurance</h2>
        <p>Marine insurance protects ships and cargo from the many things that can go wrong at sea.</p>
        <ul>
          <li>Storms can sink vessels.</li>
          <li>Accidents can destroy cargo.</li>
          <li>Piracy can hijack ships.</li>
        </ul>
        <p>Most of these risks fall under standard marine insurance policies. But war is different.</p>
        <p>War introduces risks that are harder to model and potentially catastrophic: missile strikes, naval blockades, state seizure of cargo, mines in shipping lanes. Because these risks are so unpredictable, they're usually carved out of standard policies and handled separately through war-risk insurance.</p>

        <h2>Where Lloyd's of London Fits In</h2>
        <p>Lloyd's isn't actually a single insurance company. It's more like a marketplace where specialized insurance syndicates pool capital to insure unusual risks.</p>
        <p>Historically, marine insurance has been one of Lloyd's core businesses. The system works like this:</p>
        <ul>
          <li>A shipping company goes to a broker (firms like Aon or Marsh).</li>
          <li>The broker structures a policy.</li>
          <li>The risk is then spread across multiple underwriters in the Lloyd's market.</li>
        </ul>
        <p>Each syndicate takes a portion of the risk. This is how extremely large exposures — like insuring a massive oil tanker — can be covered without a single insurer bearing the entire loss.</p>

        <h2>Why War-Risk Premiums Suddenly Spike</h2>
        <p>War-risk insurance prices are not stable. They change quickly when geopolitical tensions rise.</p>
        <p>If a region becomes dangerous for shipping, insurers may charge dramatically higher premiums for ships entering that zone. Sometimes premiums increase ten-fold within weeks. In extreme cases, insurers may even refuse coverage altogether.</p>
        <p>And here's the catch: ships cannot legally operate without insurance. That means the moment coverage disappears, global trade can grind to a halt.</p>

        <h2>Why Governments Sometimes Step In</h2>
        <p>When private insurers withdraw coverage, governments occasionally step in to stabilize the system. Historically this has happened during major wars, large terrorist attacks, and extreme geopolitical crises.</p>
        <p>Governments might provide guarantees, subsidies, or temporary insurance programs to keep ships moving through critical trade routes. The logic is simple: if shipping stops, supply chains break. If supply chains break, economies suffer. In those moments, maintaining trade becomes a national priority.</p>

        <h2>The Role of Brokers Like Aon</h2>
        <p>Many people assume insurers control everything in this system. But brokers are actually the architects of the entire structure.</p>
        <p>Companies like Aon help shipping firms design coverage that might include traditional marine insurance, war-risk insurance, reinsurance layers, and government-backed guarantees. In other words, brokers coordinate the flow of risk between multiple financial actors. Even if governments enter the market, brokers would likely remain central to structuring these deals.</p>

        <h2>A Market Built on Uncertainty</h2>
        <p>Marine insurance sits at a fascinating intersection of finance, geopolitics, and global trade. The ships move physical goods. The insurance market moves financial risk. And when geopolitical tensions rise, the entire system becomes a delicate balancing act between private capital and government intervention.</p>
        <p>For centuries, Lloyd's of London has been the center of that balancing act. But as the world becomes more politically complex, the structure of risk markets may evolve. And watching that evolution tells us a lot about how the global economy really works.</p>
      </>
    )
  },
  "what-finance-taught-me": {
    slug: "what-finance-taught-me",
    tag: "Finance Grind",
    title: "What Learning Finance Has Actually Taught Me So Far",
    date: "December 2025",
    description: "I thought finance was mostly about money. The deeper I go, the more I realize it's really about understanding how people make decisions under uncertainty.",
    seoKeywords: ["what finance teaches you", "finance major lessons", "risk management fundamentals", "markets and human behavior", "data driven finance", "finance way of thinking", "studying finance insights", "finance student perspective", "probabilistic thinking", "finance beyond money"],
    seoDescription: "Finance isn't just about stock prices and investment strategies. A finance student's honest reflection on what the field actually teaches — risk, human behavior, data, uncertainty, and a way of thinking that applies far beyond markets.",
    content: (
      <>
        <p>When I first chose to study finance, I thought it would mostly be about money.</p>
        <p>Stock prices. Investment strategies. Corporate earnings.</p>
        <p>And yes, those things are part of it.</p>
        <p>But the deeper I go into finance, the more I realize that the field is really about something much broader: understanding how people make decisions under uncertainty.</p>

        <h2>Finance Is Really About Risk</h2>
        <p>One of the first big lessons in finance is that everything revolves around risk.</p>
        <p>Every investment decision asks the same fundamental question: what could go wrong?</p>
        <ul>
          <li>Investors analyze risk.</li>
          <li>Companies manage risk.</li>
          <li>Insurers price risk.</li>
        </ul>
        <p>Even concepts like diversification or portfolio allocation are essentially ways of answering one problem: how do you protect yourself when the future is uncertain?</p>

        <h2>Markets Reflect Human Behavior</h2>
        <p>Financial markets often appear mathematical. There are equations, models, and quantitative frameworks. But beneath all of that, markets are deeply human systems.</p>
        <p>People react to fear, excitement, news headlines, and political events. Two investors can look at the same information and make completely opposite decisions. That's why markets sometimes behave unpredictably — even when the data seems clear.</p>

        <h2>Data Is Transforming Finance</h2>
        <p>Another major realization for me has been how rapidly finance is becoming data-driven.</p>
        <p>Tools like R, Python, and statistical models allow analysts to work with massive datasets. Instead of analyzing a handful of companies, researchers can now examine thousands of securities simultaneously. This shift is changing how financial insights are discovered. Data analysis is becoming just as important as traditional financial theory.</p>

        <h2>The More You Learn, the Less Certain Things Feel</h2>
        <p>Early in my studies, finance seemed like a system you could master. But the deeper you go, the more complex it becomes.</p>
        <p>Markets respond to countless variables: interest rates, geopolitical events, technological change, investor psychology. Even the best financial professionals in the world make mistakes. That uncertainty can feel intimidating, but it's also what makes the field fascinating.</p>

        <h2>Finance Teaches You How to Think</h2>
        <p>Perhaps the most valuable thing studying finance has taught me is not a specific formula or model. It's a way of thinking.</p>
        <p>Finance trains you to evaluate trade-offs, consider downside risk, analyze incentives, and think probabilistically about the future. Those skills apply far beyond markets. They shape how you evaluate decisions in everyday life.</p>

        <h2>Why I'm Still Excited About Learning</h2>
        <p>Despite the complexity — or maybe because of it — finance remains one of the most intellectually engaging subjects I've studied.</p>
        <p>Every new concept opens another layer of understanding about how the world works. Markets connect economics, politics, technology, and human psychology into one constantly evolving system. And learning how to navigate that system is a journey I'm still very much on.</p>
      </>
    )
  },
  "learning-mandarin-finance-major": {
    slug: "learning-mandarin-finance-major",
    tag: "Global De",
    title: "Learning Mandarin as a Finance Major",
    date: "December 2025",
    description: "Tones, characters, and why my flashcards know all my secrets — and why studying Mandarin and studying finance have more in common than people think.",
    seoKeywords: ["learning Mandarin finance", "Mandarin for business", "Chinese language global economy", "finance and language learning", "Mandarin tones", "studying Mandarin", "global markets language", "China economy finance", "language learning tips", "finance student abroad"],
    seoDescription: "What does Chinese have to do with finance? More than people think. A finance major's honest account of learning Mandarin — the humility it requires, the patterns it builds, and why language fluency matters in a global economy.",
    content: (
      <>
        <p>When people hear that I'm studying finance and learning Mandarin at the same time, the usual reaction is confusion.</p>
        <p>"What does Chinese have to do with finance?"</p>
        <p>At first glance, maybe nothing. One is spreadsheets, markets, and risk analysis. The other is tones, characters, and the constant fear of accidentally saying the wrong word.</p>
        <p>But the deeper I get into both, the more I realize they actually complement each other in surprising ways.</p>
        <h2>The First Humbling Lesson: Mandarin Is Not Easy</h2>
        <p>Learning Mandarin quickly teaches you humility.</p>
        <p>In English, tone doesn't change the meaning of words much. In Mandarin, tone is everything. A syllable can have completely different meanings depending on how your voice moves. One wrong tone and suddenly you're not saying what you thought you were saying.</p>
        <p>Then there are characters. Instead of memorizing an alphabet, you memorize thousands of visual symbols that represent meaning.</p>
        <p>At first it feels impossible.</p>
        <p>But something interesting happens once you stick with it. Your brain starts building patterns.</p>
        <h2>Why Learning a Language Feels Like Learning Finance</h2>
        <p>Studying Mandarin and studying finance both require patience.</p>
        <p>You don't master either one quickly. You start with small building blocks — basic vocabulary, simple financial concepts, short conversations, introductory models — and over time those pieces start connecting into something larger.</p>
        <p>In finance, you slowly begin to understand how markets interact. In language, you slowly begin to understand how ideas are structured. Both processes require the same mindset: curiosity and persistence.</p>
        <h2>My Flashcards Know My Entire Life</h2>
        <p>Language learners know this feeling well.</p>
        <p>You spend hours with flashcards repeating the same words over and over. Restaurants. Directions. Weather. Family members.</p>
        <p>At some point you realize your flashcards contain a strange collection of personal information about your life. The phrases you memorize often reflect the things you talk about most. And sometimes I laugh at how my study deck probably tells a full story about who I am — a finance student, a traveler, someone trying to understand the world a little better.</p>
        <h2>Why Mandarin Matters in a Global Economy</h2>
        <p>From a finance perspective, learning Mandarin also carries practical value.</p>
        <p>China remains one of the most important economic forces in the world. Even as geopolitical relationships evolve, understanding Chinese language and culture provides valuable perspective. Language gives you insight into how people think, how business relationships form, and how cultural expectations shape negotiations.</p>
        <p>Finance is global. Language helps you navigate that global landscape more intelligently.</p>
        <h2>The Real Reward of Learning a Language</h2>
        <p>The most rewarding part of learning Mandarin isn't grammar or vocabulary.</p>
        <p>It's the feeling of gradually unlocking another way of seeing the world.</p>
        <p>Every new language expands how you interpret culture, humor, relationships, and communication. And for someone studying global markets, that perspective matters more than people realize.</p>
        <p>Because finance isn't just about numbers.</p>
        <p>It's about understanding people.</p>
      </>
    )
  },
  "how-search-changed": {
    slug: "how-search-changed",
    tag: "Finance Grind",
    title: "How Search Changed — And What It Cost Us",
    date: "June 24, 2026",
    description: "From my dad's Dell laptop in 2009 to AI prompts in 2026 — three eras of finding things on the internet, and what the shift from searching to prompting means for information literacy.",
    seoKeywords: ["search engine evolution", "Google search history", "RAG retrieval augmented generation", "information literacy AI", "how search engines changed", "AI prompting vs searching", "academic research skills", "digital literacy", "AI hallucination problem", "search skills finance"],
    seoDescription: "From a Dell laptop in 2009 to AI prompts in 2026 — three eras of finding things on the internet. A finance student reflects on what changed when search became prompting, and why the old skills still matter.",
    content: (
      <>
        <p>The first computers I remember were the iMac G3s in my elementary school, the translucent ones with the big rounded backs that came in grape and tangerine. We used them for Paint. That was it. We were being introduced to the idea of a computer, not to what a computer could find.</p>
        <p>WiFi wasn't common yet. And even if it had been, my parents were not the type to hand a child a screen and call it education. They pushed books. If I wanted to know something, I was expected to read about it, in a library book, in an encyclopedia, in whatever physical thing was available. That was the foundation.</p>
        <p>By fifth grade, 2009, I was using the school computers a little more. But I still didn't care much about them. I liked reading. The internet felt like something other people used.</p>
        <p>The computer that changed things was my dad's Dell laptop. He had bought it, one of those sleek, black machines that felt expensive and serious, and when he was away at work, I would take it over after school. I was not doing homework. I was learning how to find things.</p>
        <p>I did not know that was what I was doing at the time. I just knew that if I typed the wrong thing into Google, I got the wrong results. And if I typed the right thing, I found exactly what I was looking for.</p>
        <p>That gap, between the wrong thing and the right thing, is where I spent years.</p>
        <h2>Era One: The Keyword Years</h2>
        <p>In 2008, Google was already dominant. But search was still a manual skill in a way that is hard to explain to someone who grew up with smartphones.</p>
        <p>You had to know how to phrase things. Not just what you were looking for, but how to describe it in a way the index could understand. Quotation marks meant exact phrases. A minus sign excluded words. The word "site:" let you search within a specific domain. If you wanted to find something obscure, you had to think like the person who wrote it, what words would they have used? What terms were specific enough to narrow the results but common enough to appear in the text?</p>
        <p>I learned this by trial and error, alone, on a Dell laptop in Brooklyn, after school.</p>
        <p>There was something about it that felt like exploration. The internet in 2008 was enormous and mostly unnavigated, at least by me. Every search was a small expedition. You would follow a result to a page, find a link on that page to somewhere else, follow that link to a forum from 2004, find a username that kept appearing in threads, and eventually end up somewhere you had not expected, with information you had not known you were looking for.</p>
        <p>The skill was not just finding things. It was knowing when you had found something real.</p>
        <h2>Era Two: The Academic Years</h2>
        <p>By the time I was in high school and then college, my searching had changed. I was not just looking for information anymore. I was looking for <em>evidence</em>.</p>
        <p>This is a different skill. Academic searching means knowing the difference between a primary source and a secondary one. It means understanding that a Wikipedia article is a starting point, not a destination, and that the citations at the bottom are where the actual work begins. It means knowing that Google Scholar and JSTOR exist, that government databases are publicly accessible, that archive.org has cached versions of websites that no longer exist.</p>
        <p>I became what I would call a scrubber. If there was a study, I could find it. If there was a primary source, I could trace it back. If someone cited a statistic without a source, I could usually find where the number originally came from, and sometimes discover that it had been misquoted or taken out of context somewhere along the chain.</p>
        <p>I got my hands on obscure websites from the early 2000s. I found PDFs that had been uploaded to university servers and forgotten. I found reports that had been cited in academic papers but never digitized, and then found that someone had scanned them and posted them to a forum in 2007.</p>
        <p>The internet, by this point, felt less like undiscovered land and more like an archive. Enormous, imperfectly organized, full of things that had been put there by someone for some reason and then left. The skill was knowing how to move through it.</p>
        <h2>Era Three: The Prompt Years</h2>
        <p>Now I am a college graduate. I work around AI evaluation and prompt engineering. And the way I find things has changed again.</p>
        <p>I can describe what I am looking for in a full sentence, sometimes a full paragraph, and a system will retrieve, synthesize, and surface relevant information in seconds. I do not need to know the exact keywords. I do not need to know which database to search. I do not need to know whether the information exists in a PDF from 2007 or a government report from 2019. I describe what I need, and the system finds it.</p>
        <p>This is, technically, a form of what researchers call Retrieval-Augmented Generation, or RAG. The model does not just generate an answer from its training data. It retrieves relevant documents, uses them as context, and constructs a response grounded in that retrieved material. The retrieval is happening, it is just happening inside a system I cannot directly see or navigate.</p>
        <p>What strikes me about this is how familiar the underlying logic is.</p>
        <p>What I was doing manually in Era Two, retrieve relevant sources, evaluate them, synthesize them into an answer, is exactly what a RAG system does. The difference is that the model does it in milliseconds, across a corpus I could never manually search, and presents the result as a coherent response rather than a list of links I have to read myself.</p>
        <p>The skill has shifted. It used to be knowing how to search. Now it is knowing how to prompt, how to describe what you need precisely enough that the system retrieves the right things, and how to evaluate whether what it retrieved is actually accurate.</p>
        <p>That second part matters more than people realize. The model can retrieve confidently and still be wrong. The hallucination problem in AI is, in some ways, the same problem as the misquoted statistic problem in Era Two: somewhere in the chain, something got distorted, and if you do not know how to check, you will not catch it.</p>
        <h2>What the Internet Felt Like as Undiscovered Land</h2>
        <p>There is a feeling I remember from the Dell laptop years that I have been trying to describe for a long time.</p>
        <p>The internet felt like a place that was mostly unexplored. Not because it was small, it was already enormous, but because I had only seen a tiny fraction of it. Every search opened a door to a section I had not been to before. There were whole communities, whole archives, whole conversations that existed and that I had no idea about until a search string happened to lead me there.</p>
        <p>That feeling went away for a while. As I got better at searching, the internet started to feel more like a known quantity, not fully mapped, but navigable. I knew where to look for things. I had a mental model of the terrain.</p>
        <p>The AI era has brought some version of that feeling back, but differently.</p>
        <p>When I interact with a large language model, I am navigating something I cannot directly see. The model's training data is a version of the internet, enormous, imperfectly organized, full of things that were put there by someone for some reason. But I cannot browse it. I can only describe what I am looking for and receive what the system decides is relevant.</p>
        <p>In some ways, this is more powerful than anything I had on the Dell laptop. In other ways, it is less. When I was following links from a 2004 forum to a cached PDF to a username that kept appearing in threads, I was building a mental map of a space. I was developing judgment about sources, about credibility, about the difference between someone who knew what they were talking about and someone who was repeating something they had read somewhere else.</p>
        <p>The model does not give me that map. It gives me answers. And answers, without the map, are harder to evaluate.</p>
        <h2>What This Means for Information Literacy</h2>
        <p>I think about this a lot in the context of finance.</p>
        <p>Financial analysis depends on the quality of the information you are working with. A model that retrieves confidently but incorrectly can produce an analysis that looks rigorous and is not. The numbers will be there. The citations will look right. The structure will be coherent. But if the underlying retrieval was wrong, if the model hallucinated a statistic or misattributed a source, the analysis built on top of it is compromised.</p>
        <p>The skill that Era Two built, knowing how to trace a claim back to its origin, knowing how to evaluate whether a source is what it claims to be, knowing when to be skeptical of a number that seems too clean, is not less valuable in the AI era. It is more valuable. Because the volume of plausible-sounding information has increased dramatically, and the tools for generating it have become accessible to everyone.</p>
        <p>The internet started as a land full of data waiting to be discovered. Search engines built roads through it. AI is building a translator that speaks the language of the terrain. But the terrain is still there, and the ability to navigate it directly, to go back to the source, to check the citation, to find the original document, is still the thing that separates analysis from repetition.</p>
        <p>I learned that on a Dell laptop in Brooklyn, after school, when my dad was away at work.</p>
        <p>I have not forgotten it.</p>
        <p><em>Sources: Pew Research Center, Internet &amp; Technology reports; Stanford Human-Centered AI Institute, AI Index 2024; Gleick, James. "The Information: A History, a Theory, a Flood" (2011); archive.org</em></p>
      </>
    )
  },
  "who-is-documenting-this": {
    slug: "who-is-documenting-this",
    tag: "Finance Grind",
    title: "Who Is Documenting This?",
    date: "June 24, 2026",
    description: "The early 1900s had Lewis Hine and Jacob Riis to document the human cost of industrialization. The AI data center boom has TikTok, Reddit, and a Fortune reporter in muddy cornfields. The structural pattern is the same.",
    seoKeywords: ["data center community impact", "Michigan data center lawsuit", "Dowagiac data center noise", "Saline Township data center", "Ypsilanti water moratorium", "Lewis Hine photography", "Jacob Riis How the Other Half Lives", "AI infrastructure externalities", "data center externalities", "industrialization parallels AI"],
    seoDescription: "The early 1900s had Lewis Hine and Jacob Riis to document the human cost of industrialization. The AI data center boom has TikTok, Reddit, and a Fortune reporter in muddy cornfields. A finance student looks at three Michigan cases and asks: who is documenting this, and will it matter?",
    content: (
      <>
        <p>There is a book that gets assigned in a lot of American history and sociology courses. It is about the early 1900s. It is about industrialization. It is about a country moving so fast toward economic growth that it forgot to ask who was paying for it.</p>
        <p>The book is not always the same one. Sometimes it is Upton Sinclair's <em>The Jungle</em>, published in 1906, which followed a Lithuanian immigrant family into the meatpacking plants of Chicago. Sometimes it is Jacob Riis's <em>How the Other Half Lives</em>, published in 1890, which used photographs and prose to document the tenement conditions of New York City's immigrant poor. Sometimes it is the work of Lewis Hine, a sociologist turned photographer who spent nearly a decade traveling the country for the National Child Labor Committee, photographing children in textile mills, coal mines, canneries, and glass factories — children as young as five, working twelve-hour shifts, in conditions that no one in a boardroom ever had to see.</p>
        <p>What united all of this work was a simple premise: the people building the wealth of the industrial economy were not the people being asked to absorb its costs. And the only way to change that was to make the costs visible.</p>
        <p>I have been thinking about this a lot lately. Because Michigan is happening.</p>
        <h2>Three Stories From the Same State</h2>
        <p>In Dowagiac, Michigan, a 30-megawatt data center operated by Alliance Cloud Services sits within one mile of more than 1,300 homes. The facility runs 24 hours a day, seven days a week. The noise it produces — a constant, low-frequency hum from its industrial cooling fans — does not stop at night. It does not stop on weekends. It does not stop.</p>
        <p>In May 2026, a Detroit-based law firm called Liddle Sheets P.C. filed what it described as the first federal class-action lawsuit of its kind in the country against Alliance Cloud Services. Residents testified that the sound had made it impossible to spend time in their backyards. One plaintiff said the value of his home had effectively dropped to zero. No one, he said, would buy a house to live with that noise. The city of Dowagiac had already revised its noise ordinance in response to earlier complaints. The lawsuit argues the facility still does not comply.</p>
        <p>In Saline Township, Michigan, a different story. A Dallas-based development firm called Related Digital proposed a 2.2-million-square-foot hyperscale data center on 575 acres of farmland — a $16 billion facility that would serve OpenAI and Oracle as part of the Stargate initiative. The Saline Township Board of Trustees voted 4-1 against rezoning the land. Two days later, Related Digital filed a lawsuit against the township, alleging exclusionary zoning and violation of due process.</p>
        <p>The township settled. Construction began in November 2025. A resident named Kathryn Haushalter — a former Marine who farms the land across the road from the site — tried to insert herself into the lawsuit as a defendant. She argued that the settlement had been approved without a proper public meeting. A county judge rejected her motion. She is appealing. Meanwhile, bulldozers and backhoes have been moving dirt on the site for months.</p>
        <blockquote>"I feel like I'm playing by a different rule book. Like I'm playing baseball and they're playing football." — Kathryn Haushalter, Saline Township resident, to Fortune (May 2026)</blockquote>
        <p>In Ypsilanti, Michigan, a third story. The University of Michigan and Los Alamos National Laboratory are planning a $1.2 billion data center that would also support nuclear weapons research. In April 2026, the Ypsilanti Community Utilities Authority voted unanimously to impose a 12-month moratorium on providing water and sewer services to new data centers. The moratorium was designed to give the community time to assess the cumulative impact of the facilities being proposed in the area.</p>
        <p>The University of Michigan responded by threatening legal action. In a letter, the university argued that withholding water from the facility was "unlawfully discriminatory" to data centers. A public university — backed by federal research dollars and a Los Alamos partnership — threatened to sue a small city utility for wanting to pause and think before committing its water supply to a nuclear-adjacent AI facility.</p>
        <p>Ypsilanti Township leaders have vowed to fight. As of June 2026, the dispute is ongoing.</p>
        <h2>What Lewis Hine Understood</h2>
        <p>Lewis Hine was not a journalist in the traditional sense. He was a sociologist who understood that data alone could not move people. Numbers about child labor existed. Reports existed. Testimony existed. None of it changed the law the way his photographs did.</p>
        <p>Between 1908 and 1918, Hine traveled to textile mills in the Carolinas, glass factories in West Virginia, coal mines in Pennsylvania, and shrimp canneries in Louisiana. He photographed children who were too young to be in those places — children who told him they were older than they were because their families needed the income. He documented their names, their ages, their heights relative to the machinery they operated. He made the invisible visible.</p>
        <p>His photographs were used in pamphlets, in legislative hearings, in public exhibitions. Theodore Roosevelt called Jacob Riis — who had done similar work in New York's tenements two decades earlier — "the most useful citizen in New York." The work of both men contributed directly to the passage of the Fair Labor Standards Act of 1938, which established the first federal minimum wage and restricted child labor in the United States. It took decades. But the documentation was the beginning.</p>
        <p>What made their work powerful was not just that it showed suffering. It was that it showed suffering that was <em>structural</em>. The children in Hine's photographs were not there by accident. They were there because the economic system of the industrial era had decided that their labor was cheaper than adult labor, that their safety was less important than production schedules, and that the communities they came from had no meaningful power to say otherwise. The documentation did not just create sympathy. It created accountability.</p>
        <h2>The New Documentarians</h2>
        <p>I want to be careful here, because I am not saying that data centers are the same as child labor. They are not. The harms are different in kind and in severity.</p>
        <p>But the structural pattern is the same.</p>
        <p>In Dowagiac, the residents living within a mile of the Alliance Cloud Services facility did not choose to live next to an industrial facility. The data center was built there because the land was available and the regulatory environment allowed it. The noise it produces is not a side effect that anyone in the company's boardroom has to live with. It is a cost that has been externalized onto a residential community that had no meaningful power to prevent it.</p>
        <p>In Saline Township, a community voted against a development. The developer sued. The community settled. Construction started. The democratic process produced a result, and capital overrode it within 48 hours.</p>
        <p>In Ypsilanti, a utility tried to pause and assess. A university threatened to sue for discrimination. The argument, essentially, was that the community's right to evaluate the cumulative impact of industrial development on its water supply was an unreasonable burden on the data center's timeline.</p>
        <p>These are not edge cases. They are a pattern. And the pattern is that the infrastructure of the AI economy is being built at a speed that consistently outpaces the ability of communities to respond — and that when communities do respond, the legal and financial resources available to the companies involved are orders of magnitude larger than those available to the people affected.</p>
        <p>What is different from the early 1900s is who is doing the documenting.</p>
        <p>Lewis Hine had a camera and a sociology degree and a mandate from the National Child Labor Committee. Jacob Riis had a flash powder and a notebook and a newspaper column. The documentation they produced took months to reach the public and years to influence policy.</p>
        <p>The documentation happening in Michigan is moving in real time. It is TikTok videos from software engineers explaining what a township water moratorium actually means. It is Reddit threads where residents post sound recordings from their backyards. It is a <em>Fortune</em> reporter walking through muddy cornfields with Kathryn Haushalter while bulldozers tear up the land across the road. It is a class-action lawsuit that gets filed on a Tuesday and is covered by local news by Thursday.</p>
        <p>The speed is different. The reach is different. But the core function is the same: making visible what the financial disclosures do not show.</p>
        <h2>The Finance Angle</h2>
        <p>I study finance. I think about these things through a financial lens. And from that angle, what is striking about the Michigan cases is how cleanly they illustrate a concept that shows up in every environmental economics course: the externality.</p>
        <p>An externality is a cost or benefit that falls on a party who did not choose to be involved in the transaction. The residents of Dowagiac did not enter into any agreement with Alliance Cloud Services. They did not receive any of the economic benefit of the facility's operation. But they are bearing a real cost — the loss of quiet, the loss of usable outdoor space, the potential loss of home value — that does not appear anywhere in the company's financial statements.</p>
        <p>The farmers of Saline Township did not agree to have 575 acres of agricultural land converted to industrial use. The people of Ypsilanti did not agree to subordinate their water supply planning to a university's construction timeline. These are costs that have been imposed without consent, and the legal frameworks that exist to address them — zoning law, environmental review, noise ordinances — are being tested, delayed, and in some cases overridden by the financial and legal resources of the entities driving the buildout.</p>
        <p>This is not new. The industrial revolution produced the same dynamic at scale. Steel mills, textile factories, and meatpacking plants generated enormous wealth for their owners and enormous costs for the communities where they operated. The regulatory frameworks we now take for granted — labor law, environmental law, zoning law — were built in response to that dynamic, over decades, through exactly the kind of documentation and advocacy that Hine and Riis were doing.</p>
        <p>The question the Michigan cases are asking is whether we are going to wait another fifty years to build the equivalent frameworks for the AI infrastructure economy. Or whether the speed of the documentation — the TikToks, the lawsuits, the <em>Fortune</em> reporters in the mud — can compress that timeline.</p>
        <h2>What I Keep Coming Back To</h2>
        <p>I read about Lewis Hine for a class. I remember thinking that the photographs were devastating not because of what they showed, but because of how ordinary it all looked. The children were not in dramatic distress. They were just working. Standing at looms, pulling coal carts, sorting shrimp. The devastation was in the normalcy of it — in the fact that this was just how things were, and no one with the power to change it had ever been made to look at it directly.</p>
        <p>The data center stories in Michigan have that same quality. The noise in Dowagiac is not a crisis. It is just constant. The construction in Saline Township is not a disaster. It is just happening. The water dispute in Ypsilanti is not a catastrophe. It is just a utility board trying to do its job and a university threatening to sue.</p>
        <p>The harm is in the accumulation. It is in the fact that these communities are being asked to absorb costs that they did not choose, for infrastructure that benefits people and institutions far away, and that the legal and financial tools available to them are consistently smaller than the ones being used against them.</p>
        <p>Lewis Hine understood that the way to change that was to make people see it. He traveled the country with a camera and made sure that the people who had the power to act could not claim they did not know.</p>
        <p>The people documenting Michigan right now are doing the same thing. They are making sure the record exists. Whether the record produces change — and how quickly — is the question that the next decade will answer.</p>
        <p><em>Sources: Fortune (May 2026), Michigan Advance (May 2026), Planet Detroit (April 2026), 404 Media (May 2026), WWMT / classaction.org (May–June 2026), AI Weekly (June 2026), Library of Congress — Lewis Hine / National Child Labor Committee Collection, Library of Congress — Jacob Riis Exhibition.</em></p>
      </>
    )
  },
  "when-ai-builds-itself": {
    slug: "when-ai-builds-itself",
    tag: "Finance Grind",
    title: "When AI Starts Building Itself: What Three Research Papers Say About the Future of Finance Work",
    date: "June 30, 2026",
    description: "Three papers from Meta, Anthropic, and Tauric Research describe AI moving up the value chain — from data labeling to trading firm decision-making. What does that mean for finance careers?",
    seoKeywords: ["AI agents finance", "Autodata Meta", "TradingAgents LLM", "Anthropic building effective agents", "full stack data analyst", "AI replacing finance jobs", "LLM trading framework", "synthetic data AI", "future of finance work", "AI value chain"],
    seoDescription: "Three research papers from Meta FAIR, Anthropic, and Tauric Research describe AI moving from data labeling to trading firm decision-making. A finance student's take on what that progression means for careers, the full stack data analyst role, and what human judgment is still worth.",
    content: (
      <>
        <p>Three papers landed on my radar this week. They come from different organizations, address different problems, and were written for different audiences. But when I read them together, they tell the same story.</p>
        <p>That story is about what happens when AI systems stop being tools that people use and start becoming systems that direct themselves.</p>
        <h2>The First Paper: Meta Teaches AI to Be Its Own Data Scientist</h2>
        <p>In June 2026, researchers at Meta's FAIR lab published a paper called <strong>Autodata</strong>. The core idea is this: building capable AI models requires enormous amounts of high-quality training data. That data has historically been created by humans, which is expensive, slow, and difficult to scale.</p>
        <p>Autodata proposes a different approach. Instead of having humans write training data, you train an AI agent to act as a data scientist. The agent generates data, evaluates it, identifies what is working and what is not, and iterates until the output meets quality criteria. Then, in a step the paper calls meta-optimization, the agent is trained to be better at the data scientist role itself, using the same criteria it applies to the data it creates.</p>
        <p>The loop is self-referential in a way that is worth pausing on. The system is not just producing outputs. It is improving the process that produces the outputs, using its own judgment about what good output looks like.</p>
        <p>The researchers tested this on computer science research tasks, legal reasoning, and mathematical problems. They found that the agentic approach outperformed classical synthetic data creation methods, and that meta-optimizing the agent itself delivered an additional performance improvement on top of that.</p>
        <p>From a finance perspective, the relevant question is not whether this works in a lab. It is what it means for the people who currently do this work. Data annotation and curation is a large industry. It employs contractors and annotation companies, often in lower-wage labor markets, doing the work of labeling images, reviewing model outputs, writing training examples, and flagging errors. That work is not glamorous, but it is essential to everything that AI systems do. Autodata is not the end of that market. But it is a signal about where the cost curve is heading.</p>
        <h2>The Second Paper: Anthropic Says the Simplest Thing Usually Wins</h2>
        <p>Around the same time, Anthropic published an engineering guide called <strong>Building Effective Agents</strong>, based on what they observed working with dozens of teams deploying LLM systems across industries.</p>
        <p>The headline finding is counterintuitive: the most successful implementations were not the most complex ones. The teams building the best systems were using simple, composable patterns, not elaborate frameworks. Anthropic's advice is to start with a single optimized LLM call, add complexity only when you can demonstrate it is needed, and understand exactly what is happening under the hood before adding another layer.</p>
        <p>They describe a taxonomy of patterns: prompt chaining, where each model call processes the output of the previous one; routing, where inputs are classified and directed to specialized processes; parallelization, where tasks are divided and run simultaneously; orchestrator-subagent systems, where one model directs others; and evaluator-optimizer loops, where one model critiques and refines the output of another.</p>
        <p>What is notable about this list is that it describes, in technical terms, the same division of labor that exists in a professional services firm. You have generalists who route work, specialists who execute it, reviewers who evaluate it, and a process that iterates until the output meets a standard. The difference is that the agents in these systems are models, not people.</p>
        <p>Anthropic is explicit that agents, meaning systems where the model dynamically directs its own process and tool use, are appropriate only when flexibility and model-driven decision-making are needed at scale. For most applications, they say, a well-optimized single call is enough. The implication is that the industry has a tendency to reach for complexity before it is warranted, and that restraint is itself a skill.</p>
        <h2>The Third Paper: A Trading Firm Made Entirely of AI</h2>
        <p>The third paper, <strong>TradingAgents</strong>, was published in December 2024 and updated through mid-2025 by researchers at Tauric Research. It proposes a multi-agent framework for stock trading, explicitly modeled on the structure of a trading firm.</p>
        <p>The system assigns different LLM agents to different roles: a fundamental analyst, a sentiment analyst, a technical analyst, a bull researcher, a bear researcher, a risk management team, and a trader who synthesizes insights from all of them. The agents debate. The risk team monitors exposure. The trader makes decisions based on the synthesis.</p>
        <p>The researchers tested this against baseline models and found improvements in cumulative returns, Sharpe ratio, and maximum drawdown. The framework is available publicly.</p>
        <p>The finance question here is more pointed than with the other two papers. TradingAgents is not automating data labeling or software development. It is automating the specific analytical and judgment roles that finance students train for and that finance professionals build careers around. Fundamental analysis. Sentiment analysis. Risk management. Synthesis and decision-making.</p>
        <p>The paper is careful to frame this as a research framework, not a production trading system. Backtested performance does not guarantee real-world results, and the history of quantitative finance is full of strategies that worked until they did not. But the direction of the research is clear. The question is not whether AI can perform these roles in a controlled environment. It is how quickly the gap between controlled environment and real-world application closes.</p>
        <h2>What These Three Papers Say Together</h2>
        <p>Read individually, each paper is interesting. Read together, they describe a progression.</p>
        <p>Autodata addresses the input side of AI: the training data that makes models capable. It suggests that AI can increasingly produce and improve that input itself, reducing the human labor required at the foundation of the stack.</p>
        <p>Building Effective Agents addresses the architecture side: how you structure AI systems to do useful work reliably. It suggests that the patterns emerging in production are mirrors of the organizational structures humans have already developed, just implemented in code.</p>
        <p>TradingAgents addresses the output side: what AI systems can do when they are organized effectively. It suggests that the analytical and judgment roles at the core of finance work are within the scope of what these systems can perform.</p>
        <p>The through-line is not that AI is replacing finance professionals. It is that AI is moving up the value chain. It started with data entry and document processing. It moved to research synthesis and pattern recognition. It is now being applied to the judgment calls that sit at the center of what finance professionals are trained to do.</p>
        <p>Anthropic's observation about simplicity is worth holding onto here. The most effective systems are not the most complex ones. They are the ones where the design is clear, the roles are well-defined, and the process is understood by the people running it. That is true for AI systems. It is also true for teams of people.</p>
        <p>The finance professionals who will navigate this transition well are probably not the ones who resist it or the ones who assume it will not affect them. They are the ones who understand what these systems are actually doing, where they fail, and what human judgment is still required to make them useful.</p>
        <p>A new job title has started appearing in postings across finance and technology: the <strong>full stack data analyst</strong>. The idea is someone who can move across the entire data pipeline, from pulling and cleaning raw data, to building models, to interpreting outputs, to communicating findings to decision-makers, without handing off between specialists at each step. It is the analyst version of what a full stack developer is in software: someone who does not need a team to ship something end to end.</p>
        <p>That role did not exist in its current form five years ago. It exists now because AI tools have compressed what used to require multiple specialists into something one person with the right skills can manage. The question is not whether that role will grow. It is whether finance programs are preparing people for it.</p>
        <p>That is a different skill set than the one most finance programs teach. But it is not an entirely new one. It is, at its core, the same thing that good analysts have always done: understand the system, identify where the model breaks down, and apply judgment where the data runs out.</p>
        <p><em>Sources: Kulikov, I. et al. (2026). Autodata: An Agentic Data Scientist to Create High Quality Synthetic Data. FAIR at Meta. arXiv:2606.25996. | Anthropic. (2024). Building Effective Agents. Anthropic Engineering. anthropic.com/engineering/building-effective-agents | Xiao, Y. et al. (2024, updated 2025). TradingAgents: Multi-Agents LLM Financial Trading Framework. Tauric Research. arXiv:2412.20138.</em></p>
      </>
    )
  },
};
