import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as o,b as c,d as p,w as i,a as n,e as s,r as l}from"./app.3dbaa68b.js";const u={},r=n(`<h1 id="scheduling-tasks" tabindex="-1"><a class="header-anchor" href="#scheduling-tasks" aria-hidden="true">#</a> Scheduling tasks</h1><p>Sometimes you may want to execute some tasks according to some schedule. For example, you want to call a function every day at 2 pm.</p><p>It&#39;s easy to do with taskiq. We have primitives that can help you to solve your problems.</p><p>Let&#39;s imagine we have a module, as shown below, and we want to execute the <code>heavy_task</code> every 5 minutes. What should we do?</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">from</span> taskiq_aio_pika <span class="token keyword">import</span> AioPikaBroker

broker <span class="token operator">=</span> AioPikaBroker<span class="token punctuation">(</span><span class="token string">&quot;amqp://guest:guest@localhost:5672/&quot;</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@broker<span class="token punctuation">.</span>task</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">heavy_task</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> value <span class="token operator">+</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Of course we can implement loop like this:</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code>    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        <span class="token keyword">await</span> heavy_task<span class="token punctuation">.</span>kiq<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>timedelta<span class="token punctuation">(</span>minutes<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span>total_seconds<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>But if you have many schedules it may be a little painful to implement. So let me introuce you the <code>TaskiqScheduler</code>. Let&#39;s add scheduler to our module.</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">from</span> taskiq_aio_pika <span class="token keyword">import</span> AioPikaBroker

<span class="token keyword">from</span> taskiq<span class="token punctuation">.</span>schedule_sources <span class="token keyword">import</span> LabelScheduleSource
<span class="token keyword">from</span> taskiq<span class="token punctuation">.</span>scheduler <span class="token keyword">import</span> TaskiqScheduler

broker <span class="token operator">=</span> AioPikaBroker<span class="token punctuation">(</span><span class="token string">&quot;amqp://guest:guest@localhost:5672/&quot;</span><span class="token punctuation">)</span>

scheduler <span class="token operator">=</span> TaskiqScheduler<span class="token punctuation">(</span>
    broker<span class="token operator">=</span>broker<span class="token punctuation">,</span>
    sources<span class="token operator">=</span><span class="token punctuation">[</span>LabelScheduleSource<span class="token punctuation">(</span>broker<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@broker<span class="token punctuation">.</span>task</span><span class="token punctuation">(</span>schedule<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">&quot;cron&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;*/5 * * * *&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;args&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">heavy_task</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> value <span class="token operator">+</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That&#39;s it.</p><p>Now we need to start our scheduler with the <code>taskiq scheduler</code> command. Like this:</p><div class="language-bash ext-sh"><pre class="language-bash"><code>taskiq scheduler module:scheduler
</code></pre></div><div class="custom-container danger"><p class="custom-container-title">Be careful!</p><p>Please always run only one instance of the scheduler! If you run more than one scheduler at a time, please be careful since it may execute one task N times, where N is the number of running scheduler instances.</p></div><p>This command will import the scheduler you defined and start sending tasks to your broker.</p>`,14),d=s("You can check list of available schedule sources in the "),k=s("Available schedule sources"),m=s(" section."),h=n('<h2 id="multiple-sources" tabindex="-1"><a class="header-anchor" href="#multiple-sources" aria-hidden="true">#</a> Multiple sources</h2><p>Sometimes you may want to use multiple sources to assemble a schedule for tasks. The <code>TaskiqScheduler</code> can do so. But it&#39;s obvious how to merge schedules from different sources.</p><p>That&#39;s why you can pass a custom merge function to resolve all possible conflicts or if you want to have more complex logic aside from sources. For example, filter out some task schedules.</p><p>Currently we have only two default functions to merge tasks. You can find them in the <code>taskiq.scheduler.merge_functions</code> module.</p><ul><li><code>preserve_all</code> - simply adds new schedules to the old ones.</li><li><code>only_unique</code> - adds scheudle only if it was not added by previous sources.</li></ul><p>Every time we update schedule it gets task from the source and executes this function to merge them together.</p>',6);function v(b,y){const a=l("RouterLink");return t(),o("div",null,[r,c("p",null,[d,p(a,{to:"/available-components/schedule-sources.html"},{default:i(()=>[k]),_:1}),m]),h])}const g=e(u,[["render",v],["__file","scheduling-tasks.html.vue"]]);export{g as default};
