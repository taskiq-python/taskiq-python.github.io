import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,a as e}from"./app-Lulzgzf0.js";const t={},o=e(`<p>This article is for people who want to:</p><ul><li>Create brokers dynamically.</li><li>Register tasks, and run them inside their code.</li><li>Implement more complex logic.</li></ul><p>Taskiq allows you to set up broker instances throughout your application and register tasks for dynamic execution. However, tasks created this way won&#39;t be found by the <code>taskiq worker</code> command.</p><p>To define tasks and assign them to a broker, use <code>register_task</code> method.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token keyword">from</span> taskiq_redis <span class="token keyword">import</span> ListQueueBroker


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token comment"># Here we define a broker.</span>
    dyn_broker <span class="token operator">=</span> ListQueueBroker<span class="token punctuation">(</span><span class="token string">&quot;redis://localhost&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> dyn_broker<span class="token punctuation">.</span>startup<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># Now we register lambda as a task.</span>
    dyn_task <span class="token operator">=</span> dyn_broker<span class="token punctuation">.</span>register_task<span class="token punctuation">(</span>
        <span class="token keyword">lambda</span> x<span class="token punctuation">:</span> <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">,</span>
        task_name<span class="token operator">=</span><span class="token string">&quot;dyn_task&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>

    <span class="token comment"># now we can send it.</span>
    <span class="token keyword">await</span> dyn_task<span class="token punctuation">.</span>kiq<span class="token punctuation">(</span>x<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>

    <span class="token keyword">await</span> dyn_broker<span class="token punctuation">.</span>shutdown<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In this example, the task is defined using a lambda within the <code>main</code> function. As the lambda is not visible outside of the <code>main</code> function scope, the task is not executable by <code>taskiq worker</code> command.</p><p>To overcome this issue, you can:</p><ul><li>Create a dynamic worker task within the current event loop.</li><li>Implement your own broker listener with the information about all of your tasks.</li></ul><p>Here&#39;s an example of a dynamic worker task creation:</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token keyword">from</span> taskiq_redis <span class="token keyword">import</span> ListQueueBroker

<span class="token keyword">from</span> taskiq<span class="token punctuation">.</span>api <span class="token keyword">import</span> run_receiver_task


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token comment"># Here we define a broker.</span>
    dyn_broker <span class="token operator">=</span> ListQueueBroker<span class="token punctuation">(</span><span class="token string">&quot;redis://localhost&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> dyn_broker<span class="token punctuation">.</span>startup<span class="token punctuation">(</span><span class="token punctuation">)</span>
    worker_task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>run_receiver_task<span class="token punctuation">(</span>dyn_broker<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment"># Now we register lambda as a task.</span>
    dyn_task <span class="token operator">=</span> dyn_broker<span class="token punctuation">.</span>register_task<span class="token punctuation">(</span>
        <span class="token keyword">lambda</span> x<span class="token punctuation">:</span> <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">,</span>
        task_name<span class="token operator">=</span><span class="token string">&quot;dyn_task&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>

    <span class="token comment"># Now we can send it.</span>
    <span class="token keyword">await</span> dyn_task<span class="token punctuation">.</span>kiq<span class="token punctuation">(</span>x<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>

    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>

    worker_task<span class="token punctuation">.</span>cancel<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token keyword">await</span> worker_task
    <span class="token keyword">except</span> asyncio<span class="token punctuation">.</span>CancelledError<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Worker successfully exited.&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">await</span> dyn_broker<span class="token punctuation">.</span>shutdown<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In this example, a named dynamic lambda task is created and registered in a broker, similar to the previous example. The difference is the creation of a new receiver coroutine for the worker task. It will listen to the new messages and execute them. The worker task will be executed in the current event loop. After exiting the scope, the worker task will get cancelled. For illustration purposes it is cancelled explicitly.</p><p>It&#39;s possible to run a scheduler in the current event loop as well:</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">import</span> datetime

<span class="token keyword">from</span> taskiq_redis <span class="token keyword">import</span> ListQueueBroker

<span class="token keyword">from</span> taskiq <span class="token keyword">import</span> TaskiqScheduler
<span class="token keyword">from</span> taskiq<span class="token punctuation">.</span>api <span class="token keyword">import</span> run_receiver_task<span class="token punctuation">,</span> run_scheduler_task
<span class="token keyword">from</span> taskiq<span class="token punctuation">.</span>schedule_sources <span class="token keyword">import</span> LabelScheduleSource


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token comment"># Here we define a broker.</span>
    dyn_broker <span class="token operator">=</span> ListQueueBroker<span class="token punctuation">(</span><span class="token string">&quot;redis://localhost&quot;</span><span class="token punctuation">)</span>
    dyn_scheduler <span class="token operator">=</span> TaskiqScheduler<span class="token punctuation">(</span>dyn_broker<span class="token punctuation">,</span> <span class="token punctuation">[</span>LabelScheduleSource<span class="token punctuation">(</span>dyn_broker<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

    <span class="token keyword">await</span> dyn_broker<span class="token punctuation">.</span>startup<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># Now we register lambda as a task.</span>
    dyn_task <span class="token operator">=</span> dyn_broker<span class="token punctuation">.</span>register_task<span class="token punctuation">(</span>
        <span class="token keyword">lambda</span> x<span class="token punctuation">:</span> <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">,</span>
        task_name<span class="token operator">=</span><span class="token string">&quot;dyn_task&quot;</span><span class="token punctuation">,</span>
        <span class="token comment"># We add a schedule when to run task.</span>
        schedule<span class="token operator">=</span><span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token comment"># Here we also can specify cron instead of time.</span>
                <span class="token string">&quot;time&quot;</span><span class="token punctuation">:</span> datetime<span class="token punctuation">.</span>datetime<span class="token punctuation">.</span>utcnow<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> datetime<span class="token punctuation">.</span>timedelta<span class="token punctuation">(</span>seconds<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token string">&quot;args&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">22</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>

    <span class="token comment"># We create scheduler after the task declaration,</span>
    <span class="token comment"># so we don&#39;t have to wait a minute before it gets to the task.</span>
    <span class="token comment"># However, defining a scheduler before the task declaration is also possible.</span>
    <span class="token comment"># But we have to wait till it gets to task execution for the second time.</span>
    worker_task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>run_receiver_task<span class="token punctuation">(</span>dyn_broker<span class="token punctuation">)</span><span class="token punctuation">)</span>
    scheduler_task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>run_scheduler_task<span class="token punctuation">(</span>dyn_scheduler<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment"># We still able to send the task.</span>
    <span class="token keyword">await</span> dyn_task<span class="token punctuation">.</span>kiq<span class="token punctuation">(</span>x<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>

    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>

    worker_task<span class="token punctuation">.</span>cancel<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token keyword">await</span> worker_task
    <span class="token keyword">except</span> asyncio<span class="token punctuation">.</span>CancelledError<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Worker successfully exited.&quot;</span><span class="token punctuation">)</span>

    scheduler_task<span class="token punctuation">.</span>cancel<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token keyword">await</span> scheduler_task
    <span class="token keyword">except</span> asyncio<span class="token punctuation">.</span>CancelledError<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Scheduler successfully exited.&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">await</span> dyn_broker<span class="token punctuation">.</span>shutdown<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),p=[o];function i(c,l){return s(),a("div",null,p)}const d=n(t,[["render",i],["__file","dynamic-brokers.html.vue"]]),k=JSON.parse(`{"path":"/guide/dynamic-brokers.html","title":"Dynamic Environments","lang":"en-US","frontmatter":{"title":"Dynamic Environments","order":9,"description":"This article is for people who want to: Create brokers dynamically. Register tasks, and run them inside their code. Implement more complex logic. Taskiq allows you to set up bro...","head":[["meta",{"property":"og:url","content":"https://taskiq-python.github.io/guide/dynamic-brokers.html"}],["meta",{"property":"og:site_name","content":"Taskiq"}],["meta",{"property":"og:title","content":"Dynamic Environments"}],["meta",{"property":"og:description","content":"This article is for people who want to: Create brokers dynamically. Register tasks, and run them inside their code. Implement more complex logic. Taskiq allows you to set up bro..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-02-05T23:36:31.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-05T23:36:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Dynamic Environments\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-05T23:36:31.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1707176191000,"updatedTime":1707176191000,"contributors":[{"name":"Pavel Kirilin","email":"win10@list.ru","commits":1}]},"filePathRelative":"guide/dynamic-brokers.md","localizedDate":"February 5, 2024","autoDesc":true,"excerpt":"<p>This article is for people who want to:</p>\\n<ul>\\n<li>Create brokers dynamically.</li>\\n<li>Register tasks, and run them inside their code.</li>\\n<li>Implement more complex logic.</li>\\n</ul>\\n<p>Taskiq allows you to set up broker instances throughout your application and register tasks for dynamic execution. However, tasks created this way won't be found by the <code>taskiq worker</code> command.</p>"}`);export{d as comp,k as data};
