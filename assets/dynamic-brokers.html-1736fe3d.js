import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as e}from"./app-4b8c3bad.js";const t={},o=e(`<p>This article is for all the people who want to dynamically create brokers, register tasks, and run them inside their code. Or maybe implement more complex logic.</p><p>The Taskiq allows you to create broker instances in all parts of your application. You can register tasks dynamically and run them. But when tasks are created dynamically, the <code>taskiq worker</code> command won&#39;t be able to find them.</p><p>To define tasks and assign them to broker, use <code>register_task</code> method.</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The problem with this code is that if we run the <code>taskiq worker</code> command, it won&#39;t be able to execute our tasks. Because lambdas are created within the <code>main</code> function and they are not visible outside of it.</p><p>To surpass this issue, we need to create a dynamic worker task within the current loop. Or, we can create a code that can listen to our brokers and have all information about dynamic functions.</p><p>Here I won&#39;t be showing how to create your own CLI command, but I&#39;ll show you how to create a dynamic worker within the current loop.</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

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

    <span class="token comment"># now we can send it.</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Here we define a dynamic lambda task with some name, assign it to broker, as we did before. The only difference is that we start our receiver coroutine, that will listen to the new messages and execute them. Receiver task will be executed in the current loop, and when main function exits, the receriver task is canceled. But for illustration purpose, I canceled it manually.</p><p>Sometimes you need to run not only receiver, but a scheduler as well. You can do it, by using another function that also can work within the current loop.</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio
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
    <span class="token comment"># but we have to wait till it gets to task execution for the second time.</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),p=[o];function i(c,l){return s(),a("div",null,p)}const d=n(t,[["render",i],["__file","dynamic-brokers.html.vue"]]);export{d as default};
