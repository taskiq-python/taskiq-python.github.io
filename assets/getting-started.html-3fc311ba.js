import{_ as u}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as d,c as k,e as o,w as a,b as n,d as s,a as p}from"./app-51797d6e.js";const v={},m=n("h1",{id:"getting-started",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#getting-started","aria-hidden":"true"},"#"),s(" Getting started")],-1),b=n("h2",{id:"installation",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#installation","aria-hidden":"true"},"#"),s(" Installation")],-1),h=n("p",null,"You can install taskiq from pypi or directly from git using pip:",-1),g=n("div",{class:"language-bash","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[s("pip "),n("span",{class:"token function"},"install"),s(` taskiq
`)])])],-1),y=n("div",{class:"language-bash","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[s("pip "),n("span",{class:"token function"},"install"),s(` git+https://github.com/taskiq-python/taskiq.git
`)])])],-1),w={href:"https://pypi.org/search/?q=taskiq",target:"_blank",rel:"noopener noreferrer"},_={class:"hint-container info"},f=n("p",{class:"hint-container-title"},"Cool tip!",-1),q={href:"https://pypi.org/project/taskiq-aio-pika/",target:"_blank",rel:"noopener noreferrer"},x={href:"https://pypi.org/project/taskiq-nats/",target:"_blank",rel:"noopener noreferrer"},A={href:"https://pypi.org/project/taskiq-redis/",target:"_blank",rel:"noopener noreferrer"},B=p(`<h2 id="running-tasks" tabindex="-1"><a class="header-anchor" href="#running-tasks" aria-hidden="true">#</a> Running tasks</h2><p>Now you need to create a python module with broker declaration. It&#39;s just a plain python file with the variable of your broker. For this particular example, I&#39;m going to use the <code>InMemoryBroker</code>.</p><div class="hint-container danger"><p class="hint-container-title">Important note</p><p>The InMemoryBroker doesn&#39;t send any data over the network, and you cannot use this broker in a real-world scenario, but it&#39;s still useful for local development if you do not want to set up a taskiq worker.</p></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># broker.py</span>
<span class="token keyword">from</span> taskiq <span class="token keyword">import</span> InMemoryBroker

broker <span class="token operator">=</span> InMemoryBroker<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>And that&#39;s it. Now let&#39;s add some tasks and the main function. You can add tasks in separate modules. You can find more information about that further. Also, we call the <code>startup</code> method at the beginning of the <code>main</code> function.</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># broker.py</span>
<span class="token keyword">import</span> asyncio

<span class="token keyword">from</span> taskiq <span class="token keyword">import</span> InMemoryBroker

broker <span class="token operator">=</span> InMemoryBroker<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@broker<span class="token punctuation">.</span>task</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">add_one</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> value <span class="token operator">+</span> <span class="token number">1</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token comment"># Never forget to call startup in the beginning.</span>
    <span class="token keyword">await</span> broker<span class="token punctuation">.</span>startup<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment"># Send the task to the broker.</span>
    task <span class="token operator">=</span> <span class="token keyword">await</span> add_one<span class="token punctuation">.</span>kiq<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token comment"># Wait for the result.</span>
    result <span class="token operator">=</span> <span class="token keyword">await</span> task<span class="token punctuation">.</span>wait_result<span class="token punctuation">(</span>timeout<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Task execution took: </span><span class="token interpolation"><span class="token punctuation">{</span>result<span class="token punctuation">.</span>execution_time<span class="token punctuation">}</span></span><span class="token string"> seconds.&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> result<span class="token punctuation">.</span>is_err<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Returned value: </span><span class="token interpolation"><span class="token punctuation">{</span>result<span class="token punctuation">.</span>return_value<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Error found while executing task.&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> broker<span class="token punctuation">.</span>shutdown<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">Cool warning!</p><p>Calling the <code>startup</code> method is necessary. If you don&#39;t call it, you may get an undefined behaviour.</p></div><p>If you run this code, you will get this in your terminal:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>❯ python mybroker.py
Task execution took: <span class="token number">7</span>.3909759521484375e-06 seconds.
Returned value: <span class="token number">2</span>
</code></pre></div><p>Ok, the code of the task execution is a little bit fancier than an ordinary function call, but it&#39;s still relatively simple to understand. To send a task to the broker, you need to call the <code>.kiq</code> method on the function, it returns the <code>TaskiqTask</code> object that can check whether the result is ready or not. Also it has methods to wait for the result to become available.</p>`,10),T=n("h2",{id:"distributed-run",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#distributed-run","aria-hidden":"true"},"#"),s(" Distributed run")],-1),I=n("p",null,"Now let's change InMemoryBroker to some distributed broker instead. In this example we are going to use broker that works with rabbitMQ.",-1),R={href:"https://pypi.org/project/taskiq-aio-pika/",target:"_blank",rel:"noopener noreferrer"},L=p(`<div class="language-bash" data-ext="sh"><pre class="language-bash"><code>pip <span class="token function">install</span> taskiq-aio-pika
</code></pre></div><p>After the installation, replace the broker we defined earlier with the broker from the <code>taskiq-aio-pika</code>.</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> taskiq_aio_pika <span class="token keyword">import</span> AioPikaBroker

broker <span class="token operator">=</span> AioPikaBroker<span class="token punctuation">(</span><span class="token string">&#39;amqp://guest:guest@localhost:5672&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Also, AioPika broker requires to call startup before using it. Add this line at the beginning of the main function.</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">await</span> broker<span class="token punctuation">.</span>startup<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>That&#39;s all you need to do.</p><details class="hint-container details"><summary>Complete code</summary><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># broker.py</span>
<span class="token keyword">import</span> asyncio

<span class="token keyword">from</span> taskiq_aio_pika <span class="token keyword">import</span> AioPikaBroker

broker <span class="token operator">=</span> AioPikaBroker<span class="token punctuation">(</span><span class="token string">&quot;amqp://guest:guest@localhost:5672&quot;</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@broker<span class="token punctuation">.</span>task</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">add_one</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> value <span class="token operator">+</span> <span class="token number">1</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> broker<span class="token punctuation">.</span>startup<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment"># Send the task to the broker.</span>
    task <span class="token operator">=</span> <span class="token keyword">await</span> add_one<span class="token punctuation">.</span>kiq<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token comment"># Wait for the result.</span>
    result <span class="token operator">=</span> <span class="token keyword">await</span> task<span class="token punctuation">.</span>wait_result<span class="token punctuation">(</span>timeout<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Task execution took: </span><span class="token interpolation"><span class="token punctuation">{</span>result<span class="token punctuation">.</span>execution_time<span class="token punctuation">}</span></span><span class="token string"> seconds.&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> result<span class="token punctuation">.</span>is_err<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Returned value: </span><span class="token interpolation"><span class="token punctuation">{</span>result<span class="token punctuation">.</span>return_value<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Error found while executing task.&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> broker<span class="token punctuation">.</span>shutdown<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>Let&#39;s run the worker process. First of all, we need rabbitMQ up and running. I highly recommend you use docker.</p>`,8),M=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"docker"),s(" run "),n("span",{class:"token parameter variable"},"--rm"),s(),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token punctuation"},"\\"),s(`
    `),n("span",{class:"token parameter variable"},"-p"),s(),n("span",{class:"token string"},'"5672:5672"'),s(),n("span",{class:"token punctuation"},"\\"),s(`
    `),n("span",{class:"token parameter variable"},"-p"),s(),n("span",{class:"token string"},'"15672:15672"'),s(),n("span",{class:"token punctuation"},"\\"),s(`
    `),n("span",{class:"token parameter variable"},"--env"),s(),n("span",{class:"token string"},'"RABBITMQ_DEFAULT_USER=guest"'),s(),n("span",{class:"token punctuation"},"\\"),s(`
    `),n("span",{class:"token parameter variable"},"--env"),s(),n("span",{class:"token string"},'"RABBITMQ_DEFAULT_PASS=guest"'),s(),n("span",{class:"token punctuation"},"\\"),s(`
    `),n("span",{class:"token parameter variable"},"--env"),s(),n("span",{class:"token string"},'"RABBITMQ_DEFAULT_VHOST=/"'),s(),n("span",{class:"token punctuation"},"\\"),s(`
    rabbitmq:3.8.27-management-alpine
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),N=n("div",{class:"language-powershell line-numbers-mode","data-ext":"powershell"},[n("pre",{class:"language-powershell"},[n("code",null,[s("docker run "),n("span",{class:"token operator"},"--"),n("span",{class:"token function"},"rm"),s(),n("span",{class:"token operator"},"-"),s(`d ^
    `),n("span",{class:"token operator"},"-"),s("p "),n("span",{class:"token string"},'"5672:5672"'),s(` ^
    `),n("span",{class:"token operator"},"-"),s("p "),n("span",{class:"token string"},'"15672:15672"'),s(` ^
    `),n("span",{class:"token operator"},"--"),s("env "),n("span",{class:"token string"},'"RABBITMQ_DEFAULT_USER=guest"'),s(` ^
    `),n("span",{class:"token operator"},"--"),s("env "),n("span",{class:"token string"},'"RABBITMQ_DEFAULT_PASS=guest"'),s(` ^
    `),n("span",{class:"token operator"},"--"),s("env "),n("span",{class:"token string"},'"RABBITMQ_DEFAULT_VHOST=/"'),s(` ^
    rabbitmq:3`),n("span",{class:"token punctuation"},"."),s("8"),n("span",{class:"token punctuation"},"."),s(`27-management-alpine
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),E=p(`<div class="language-bash" data-ext="sh"><pre class="language-bash"><code>taskiq worker broker:broker
</code></pre></div><p>After the worker is up, we can run our script as an ordinary python file and see how the worker executes tasks.</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ python broker.py
Task execution took: <span class="token number">0.0</span> seconds.
Returned value: None
</code></pre></div>`,3),S={href:"https://pypi.org/project/taskiq-redis/",target:"_blank",rel:"noopener noreferrer"},P=p(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pip <span class="token function">install</span> taskiq-redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>After the installation, add a new result backend to the broker.</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> taskiq_redis <span class="token keyword">import</span> RedisAsyncResultBackend

broker <span class="token operator">=</span> AioPikaBroker<span class="token punctuation">(</span>
    <span class="token string">&quot;amqp://guest:guest@localhost:5672&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">.</span>with_result_backend<span class="token punctuation">(</span>RedisAsyncResultBackend<span class="token punctuation">(</span><span class="token string">&quot;redis://localhost&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now we need to start redis.</p>`,4),C=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"docker"),s(" run "),n("span",{class:"token parameter variable"},"--rm"),s(),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token punctuation"},"\\"),s(`
    `),n("span",{class:"token parameter variable"},"-p"),s(),n("span",{class:"token string"},'"6379:6379"'),s(),n("span",{class:"token punctuation"},"\\"),s(`
    redis
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),F=n("div",{class:"language-powershell line-numbers-mode","data-ext":"powershell"},[n("pre",{class:"language-powershell"},[n("code",null,[s("docker run "),n("span",{class:"token operator"},"--"),n("span",{class:"token function"},"rm"),s(),n("span",{class:"token operator"},"-"),s(`d ^
    `),n("span",{class:"token operator"},"-"),s("p "),n("span",{class:"token string"},'"6379:6379"'),s(` ^
    redis
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),Q=p(`<details class="hint-container details"><summary>Complete code</summary><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># broker.py</span>
<span class="token keyword">import</span> asyncio

<span class="token keyword">from</span> taskiq_aio_pika <span class="token keyword">import</span> AioPikaBroker
<span class="token keyword">from</span> taskiq_redis <span class="token keyword">import</span> RedisAsyncResultBackend

broker <span class="token operator">=</span> AioPikaBroker<span class="token punctuation">(</span>
    <span class="token string">&quot;amqp://guest:guest@localhost:5672&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">.</span>with_result_backend<span class="token punctuation">(</span>RedisAsyncResultBackend<span class="token punctuation">(</span><span class="token string">&quot;redis://localhost&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@broker<span class="token punctuation">.</span>task</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">add_one</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> value <span class="token operator">+</span> <span class="token number">1</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> broker<span class="token punctuation">.</span>startup<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment"># Send the task to the broker.</span>
    task <span class="token operator">=</span> <span class="token keyword">await</span> add_one<span class="token punctuation">.</span>kiq<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token comment"># Wait for the result.</span>
    result <span class="token operator">=</span> <span class="token keyword">await</span> task<span class="token punctuation">.</span>wait_result<span class="token punctuation">(</span>timeout<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Task execution took: </span><span class="token interpolation"><span class="token punctuation">{</span>result<span class="token punctuation">.</span>execution_time<span class="token punctuation">}</span></span><span class="token string"> seconds.&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> result<span class="token punctuation">.</span>is_err<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Returned value: </span><span class="token interpolation"><span class="token punctuation">{</span>result<span class="token punctuation">.</span>return_value<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Error found while executing task.&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> broker<span class="token punctuation">.</span>shutdown<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>Let&#39;s run taskiq once again. The command is the same.</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>taskiq worker broker:broker
</code></pre></div><p>Now, if we run this file with python, we can get the correct results with a valid execution time.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ python broker.py
Task execution took: <span class="token number">1</span>.0013580322265625e-05 seconds.
Returned value: <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Continue reading to get more information about taskiq internals.</p>`,6);function U(j,D){const l=c("Tabs"),i=c("ExternalLinkIcon"),r=c("RouterLink");return d(),k("div",null,[m,b,h,o(l,{id:"9",data:[{id:"pypi"},{id:"git"}]},{title0:a(({value:e,isActive:t})=>[s("pypi")]),title1:a(({value:e,isActive:t})=>[s("git")]),tab0:a(({value:e,isActive:t})=>[g]),tab1:a(({value:e,isActive:t})=>[y]),_:1}),n("p",null,[s("After installation of the core library, you need to find the broker that fits you. You can do it using "),n("a",w,[s("PyPI"),o(i)]),s(" search.")]),n("div",_,[f,n("p",null,[s("We highly recommend "),n("a",q,[s("taskiq-aio-pika"),o(i)]),s(" or "),n("a",x,[s("taskiq-nats"),o(i)]),s(" as the broker and "),n("a",A,[s("taskiq-redis"),o(i)]),s(" as the result backend for production use.")])]),B,n("p",null,[s('You can get more information about taskiq types, CLI and internal structure in the "'),o(r,{to:"/guide/architecture-overview.html"},{default:a(()=>[s("Architecture overview")]),_:1}),s('" section.')]),T,I,n("p",null,[s("At first we must install the "),n("a",R,[s("taskiq-aio-pika"),o(i)]),s(" lib.")]),L,o(l,{id:"83",data:[{id:"linux|macos"},{id:"windows"}]},{title0:a(({value:e,isActive:t})=>[s("linux|macos")]),title1:a(({value:e,isActive:t})=>[s("windows")]),tab0:a(({value:e,isActive:t})=>[M]),tab1:a(({value:e,isActive:t})=>[N]),_:1}),n("p",null,[s("Now we need to start worker process by running taskiq cli command. You can get more info about the CLI in the "),o(r,{to:"/guide/cli.html"},{default:a(()=>[s("CLI")]),_:1}),s(" section.")]),E,n("p",null,[s("But the printed result value is not correct. That happens because we didn't provide any result backend that can store results of task execution. To store results, we can use the "),n("a",S,[s("taskiq-redis"),o(i)]),s(" library.")]),P,o(l,{id:"110",data:[{id:"linux|macos"},{id:"windows"}]},{title0:a(({value:e,isActive:t})=>[s("linux|macos")]),title1:a(({value:e,isActive:t})=>[s("windows")]),tab0:a(({value:e,isActive:t})=>[C]),tab1:a(({value:e,isActive:t})=>[F]),_:1}),Q])}const W=u(v,[["render",U],["__file","getting-started.html.vue"]]);export{W as default};