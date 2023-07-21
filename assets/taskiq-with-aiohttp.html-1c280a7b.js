import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as p,c,b as s,d as n,e,a as t}from"./app-09ee9d4a.js";const l={},r=s("h1",{id:"taskiq-aiohttp",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#taskiq-aiohttp","aria-hidden":"true"},"#"),n(" Taskiq + AioHTTP")],-1),d=s("p",null,"AioHTTP is a framework for building robust applications. We created several libraries to make the experience with AioHTTP even better.",-1),u=s("h1",{id:"dependency-inecjeciton-for-aiohttp",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#dependency-inecjeciton-for-aiohttp","aria-hidden":"true"},"#"),n(" Dependency inecjeciton for AioHTTP")],-1),k={href:"https://pypi.org/project/aiohttp-deps/",target:"_blank",rel:"noopener noreferrer"},v=t(`<p>To install it, simply run:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>pip install <span class="token string">&quot;aiohttp-deps&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>After the installation, please add startup event to your application to initialize dependencies context.</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> aiohttp <span class="token keyword">import</span> web
<span class="token keyword">import</span> aiohttp_deps


app <span class="token operator">=</span> web<span class="token punctuation">.</span>Application<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># This startup event makes all the magic happen.</span>
<span class="token comment"># It parses current handlers and create dependency graphs for them.</span>
app<span class="token punctuation">.</span>on_startup<span class="token punctuation">.</span>append<span class="token punctuation">(</span>aiohttp_deps<span class="token punctuation">.</span>init<span class="token punctuation">)</span>

web<span class="token punctuation">.</span>run_app<span class="token punctuation">(</span>app<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),m={href:"https://github.com/taskiq-python/aiohttp-deps",target:"_blank",rel:"noopener noreferrer"},h=s("h2",{id:"adding-taskiq-integration",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#adding-taskiq-integration","aria-hidden":"true"},"#"),n(" Adding taskiq integration")],-1),b={href:"https://pypi.org/project/taskiq-aiohttp/",target:"_blank",rel:"noopener noreferrer"},y=t(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>pip install <span class="token string">&quot;taskiq-aiohttp&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>After the installation is complete, add an initialization function call to your broker&#39;s main file so it becomes something like this:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> taskiq_aiohttp

broker <span class="token operator">=</span> MyBroker<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># The second argument is a path to web.Application variable.</span>
<span class="token comment"># Also you can provide here a factory function that takes no</span>
<span class="token comment"># arguments and returns an application. This function can be async.</span>
taskiq_aiohttp<span class="token punctuation">.</span>init<span class="token punctuation">(</span>broker<span class="token punctuation">,</span> <span class="token string">&quot;my_project.main:app&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>From this point, you&#39;ll be able to reuse the same dependencies as with <code>aiohttp-deps</code>. Let&#39;s take a look at this function:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> aiohttp <span class="token keyword">import</span> web
<span class="token keyword">from</span> taskiq <span class="token keyword">import</span> TaskiqDepends
<span class="token keyword">from</span> my_project<span class="token punctuation">.</span>tkq <span class="token keyword">import</span> broker

<span class="token decorator annotation punctuation">@broker<span class="token punctuation">.</span>task</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">my_task</span><span class="token punctuation">(</span>app<span class="token punctuation">:</span> web<span class="token punctuation">.</span>Application <span class="token operator">=</span> TaskiqDepends<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In this example, we depend on the current application. We can use its state in a current task or any other dependency. We can take db_pool from your application&#39;s state, which is the same pool, as the one you&#39;ve created on AiohTTP&#39;s startup. But this application is only a mock of your application. It has correct types and all your variables that you filled on startup, but it doesn&#39;t handle any request. This integration adds two main dependencies:</p><ul><li>web.Application - current application.</li><li>web.Request - mocked request. This request only exists to be able to use the same dependencies.</li></ul>`,7),g={href:"https://github.com/taskiq-python/examples",target:"_blank",rel:"noopener noreferrer"},_=t(`<h2 id="testing" tabindex="-1"><a class="header-anchor" href="#testing" aria-hidden="true">#</a> Testing</h2><p>Writing tests for AioHTTP with taskiq is as easy as writing tests for the aiohttp application. The only difference is that, if you want to use InMemoryBroker, then you need to add context for dependency injection. It&#39;s easier to call <code>populate_context</code> when creating a <code>test_client</code> fixture.</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> taskiq_aiohttp

<span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>fixture</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">test_client</span><span class="token punctuation">(</span>
    app<span class="token punctuation">:</span> web<span class="token punctuation">.</span>Application<span class="token punctuation">,</span>
<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> AsyncGenerator<span class="token punctuation">[</span>TestClient<span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    Create a test client.

    This function creates a TestServer
    and a test client for the application.

    Also this fixture populates context
    with needed variables.

    :param app: current application.
    :yield: ready to use client.
    &quot;&quot;&quot;</span>
    loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_running_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>
    server <span class="token operator">=</span> TestServer<span class="token punctuation">(</span>app<span class="token punctuation">)</span>
    client <span class="token operator">=</span> TestClient<span class="token punctuation">(</span>server<span class="token punctuation">,</span> loop<span class="token operator">=</span>loop<span class="token punctuation">)</span>

    <span class="token keyword">await</span> client<span class="token punctuation">.</span>start_server<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># This is important part.</span>
    <span class="token comment"># Since InMemoryBroker doesn&#39;t</span>
    <span class="token comment"># run as a worker process, we have to populate</span>
    <span class="token comment"># broker&#39;s context by hand.</span>
    taskiq_aiohttp<span class="token punctuation">.</span>populate_context<span class="token punctuation">(</span>
        broker<span class="token operator">=</span>broker<span class="token punctuation">,</span>
        server<span class="token operator">=</span>server<span class="token punctuation">.</span>runner<span class="token punctuation">.</span>server<span class="token punctuation">,</span>
        app<span class="token operator">=</span>app<span class="token punctuation">,</span>
        loop<span class="token operator">=</span>loop<span class="token punctuation">,</span>
    <span class="token punctuation">)</span>

    <span class="token keyword">yield</span> client

    broker<span class="token punctuation">.</span>custom_dependency_context <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">await</span> client<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function f(w,q){const a=o("ExternalLinkIcon");return p(),c("div",null,[r,d,u,s("p",null,[n("We created a library "),s("a",k,[n("aiohttp-deps"),e(a)]),n(" to add FastAPI-like dependency injection in AioHTTP.")]),v,s("p",null,[n("You can read more about dependency injection and available dependencies in the project's "),s("a",m,[n("README.md"),e(a)]),n(".")]),h,s("p",null,[n("We highly recommend using aiohttp with aiohttp-deps because it allows us to reuse the same dependencies for your handlers and tasks. First of all, you should install the "),s("a",b,[n("taskiq-aiohttp"),e(a)]),n(" library.")]),y,s("p",null,[n("You can find more detailed examples in the "),s("a",g,[n("examples repo"),e(a)]),n(".")]),_])}const A=i(l,[["render",f],["__file","taskiq-with-aiohttp.html.vue"]]);export{A as default};
