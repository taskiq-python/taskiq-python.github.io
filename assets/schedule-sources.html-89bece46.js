import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,a as e}from"./app-d1b28e20.js";const t={},o=e(`<h1 id="schedule-source" tabindex="-1"><a class="header-anchor" href="#schedule-source" aria-hidden="true">#</a> Schedule source</h1><p>Schedule sources are used to get schedule for tasks. To create new <code>schedule source</code> you have to implement the <code>taskiq.abc.schedule_source.ScheduleSource</code> abstract class.</p><p>Here&#39;s a minimal example of a schedule source:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> typing <span class="token keyword">import</span> List

<span class="token keyword">from</span> taskiq <span class="token keyword">import</span> ScheduledTask<span class="token punctuation">,</span> ScheduleSource


<span class="token keyword">class</span> <span class="token class-name">MyScheduleSource</span><span class="token punctuation">(</span>ScheduleSource<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">startup</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Do something when starting broker.&quot;&quot;&quot;</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">shutdown</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Do something on shutdown.&quot;&quot;&quot;</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">get_schedules</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> List<span class="token punctuation">[</span><span class="token string">&quot;ScheduledTask&quot;</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token comment"># Here you must return list of scheduled tasks from your source.</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span>
            ScheduledTask<span class="token punctuation">(</span>
                task_name<span class="token operator">=</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                labels<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                args<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                kwargs<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                cron<span class="token operator">=</span><span class="token string">&quot;* * * * *&quot;</span><span class="token punctuation">,</span>
                <span class="token comment">#</span>
                <span class="token comment"># We need point on self source for calling pre_send / post_send when</span>
                <span class="token comment"># task is ready to be enqueued.</span>
                source<span class="token operator">=</span>self<span class="token punctuation">,</span>
            <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>

    <span class="token comment"># This method is optional. You may not implement this.</span>
    <span class="token comment"># It&#39;s just a helper to people to be able to interact with your source.</span>
    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">add_schedule</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> schedule<span class="token punctuation">:</span> <span class="token string">&quot;ScheduledTask&quot;</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token keyword">await</span> <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>add_schedule<span class="token punctuation">(</span>schedule<span class="token punctuation">)</span>

    <span class="token comment"># This method is optional. You may not implement this.</span>
    <span class="token comment"># It&#39;s just a helper to people to be able to interact with your source.</span>
    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">pre_send</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> task<span class="token punctuation">:</span> <span class="token string">&quot;ScheduledTask&quot;</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        Actions to execute before task will be sent to broker.

        :param task: task that will be sent
        &quot;&quot;&quot;</span>

    <span class="token comment"># This method is optional. You may not implement this.</span>
    <span class="token comment"># It&#39;s just a helper to people to be able to interact with your source.</span>
    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">post_send</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> task<span class="token punctuation">:</span> <span class="token string">&quot;ScheduledTask&quot;</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        Actions to execute after task was sent to broker.

        :param task: task that just have sent
        &quot;&quot;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),p=[o];function c(l,i){return n(),a("div",null,p)}const d=s(t,[["render",c],["__file","schedule-sources.html.vue"]]);export{d as default};
