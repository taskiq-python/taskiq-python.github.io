import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as d,c as u,b as n,d as s,e as a,w as t,a as p}from"./app-5bc69eb1.js";const k={},v=n("h1",{id:"taskiq-aiohttp",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#taskiq-aiohttp","aria-hidden":"true"},"#"),s(" Taskiq + AioHTTP")],-1),m=n("p",null,"AioHTTP is a framework for building robust applications. We created several libraries to make the experience with AioHTTP even better.",-1),h=n("h1",{id:"dependency-inecjeciton-for-aiohttp",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#dependency-inecjeciton-for-aiohttp","aria-hidden":"true"},"#"),s(" Dependency inecjeciton for AioHTTP")],-1),b={href:"https://pypi.org/project/aiohttp-deps/",target:"_blank",rel:"noopener noreferrer"},y=p(`<p>To install it, simply run:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>pip install <span class="token string">&quot;aiohttp-deps&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>After the installation, please add startup event to your application to initialize dependencies context.</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> aiohttp <span class="token keyword">import</span> web
<span class="token keyword">import</span> aiohttp_deps


app <span class="token operator">=</span> web<span class="token punctuation">.</span>Application<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># This startup event makes all the magic happen.</span>
<span class="token comment"># It parses current handlers and create dependency graphs for them.</span>
app<span class="token punctuation">.</span>on_startup<span class="token punctuation">.</span>append<span class="token punctuation">(</span>aiohttp_deps<span class="token punctuation">.</span>init<span class="token punctuation">)</span>

web<span class="token punctuation">.</span>run_app<span class="token punctuation">(</span>app<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),_={href:"https://github.com/taskiq-python/aiohttp-deps",target:"_blank",rel:"noopener noreferrer"},f=n("h2",{id:"adding-taskiq-integration",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#adding-taskiq-integration","aria-hidden":"true"},"#"),s(" Adding taskiq integration")],-1),g={href:"https://pypi.org/project/taskiq-aiohttp/",target:"_blank",rel:"noopener noreferrer"},w=p(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>pip install <span class="token string">&quot;taskiq-aiohttp&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>After the installation is complete, add an initialization function call to your broker&#39;s main file so it becomes something like this:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> taskiq_aiohttp

broker <span class="token operator">=</span> MyBroker<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># The second argument is a path to web.Application variable.</span>
<span class="token comment"># Also you can provide here a factory function that takes no</span>
<span class="token comment"># arguments and returns an application. This function can be async.</span>
taskiq_aiohttp<span class="token punctuation">.</span>init<span class="token punctuation">(</span>broker<span class="token punctuation">,</span> <span class="token string">&quot;my_project.main:app&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>From this point, you&#39;ll be able to reuse the same dependencies as with <code>aiohttp-deps</code>. Let&#39;s take a look at this function:</p>`,4),q=n("div",{class:"language-python line-numbers-mode","data-ext":"py"},[n("pre",{class:"language-python"},[n("code",null,[n("span",{class:"token keyword"},"from"),s(" aiohttp "),n("span",{class:"token keyword"},"import"),s(` web
`),n("span",{class:"token keyword"},"from"),s(" typing "),n("span",{class:"token keyword"},"import"),s(` Annotated
`),n("span",{class:"token keyword"},"from"),s(" taskiq "),n("span",{class:"token keyword"},"import"),s(` TaskiqDepends
`),n("span",{class:"token keyword"},"from"),s(" my_project"),n("span",{class:"token punctuation"},"."),s("tkq "),n("span",{class:"token keyword"},"import"),s(` broker

`),n("span",{class:"token decorator annotation punctuation"},[s("@broker"),n("span",{class:"token punctuation"},"."),s("task")]),s(`
`),n("span",{class:"token keyword"},"async"),s(),n("span",{class:"token keyword"},"def"),s(),n("span",{class:"token function"},"my_task"),n("span",{class:"token punctuation"},"("),s("app"),n("span",{class:"token punctuation"},":"),s(" Annotated"),n("span",{class:"token punctuation"},"["),s("web"),n("span",{class:"token punctuation"},"."),s("Application"),n("span",{class:"token punctuation"},","),s(" TaskiqDepends"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token punctuation"},"."),n("span",{class:"token punctuation"},"."),n("span",{class:"token punctuation"},"."),s(`

`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),T=n("div",{class:"language-python line-numbers-mode","data-ext":"py"},[n("pre",{class:"language-python"},[n("code",null,[n("span",{class:"token keyword"},"from"),s(" aiohttp "),n("span",{class:"token keyword"},"import"),s(` web
`),n("span",{class:"token keyword"},"from"),s(" taskiq "),n("span",{class:"token keyword"},"import"),s(` TaskiqDepends
`),n("span",{class:"token keyword"},"from"),s(" my_project"),n("span",{class:"token punctuation"},"."),s("tkq "),n("span",{class:"token keyword"},"import"),s(` broker

`),n("span",{class:"token decorator annotation punctuation"},[s("@broker"),n("span",{class:"token punctuation"},"."),s("task")]),s(`
`),n("span",{class:"token keyword"},"async"),s(),n("span",{class:"token keyword"},"def"),s(),n("span",{class:"token function"},"my_task"),n("span",{class:"token punctuation"},"("),s("app"),n("span",{class:"token punctuation"},":"),s(" web"),n("span",{class:"token punctuation"},"."),s("Application "),n("span",{class:"token operator"},"="),s(" TaskiqDepends"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token punctuation"},"."),n("span",{class:"token punctuation"},"."),n("span",{class:"token punctuation"},"."),s(`

`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),x=n("p",null,"In this example, we depend on the current application. We can use its state in a current task or any other dependency. We can take db_pool from your application's state, which is the same pool, as the one you've created on AiohTTP's startup. But this application is only a mock of your application. It has correct types and all your variables that you filled on startup, but it doesn't handle any request. This integration adds two main dependencies:",-1),A=n("ul",null,[n("li",null,"web.Application - current application."),n("li",null,"web.Request - mocked request. This request only exists to be able to use the same dependencies.")],-1),j={href:"https://github.com/taskiq-python/examples",target:"_blank",rel:"noopener noreferrer"},I=p(`<h2 id="testing" tabindex="-1"><a class="header-anchor" href="#testing" aria-hidden="true">#</a> Testing</h2><p>Writing tests for AioHTTP with taskiq is as easy as writing tests for the aiohttp application. The only difference is that, if you want to use InMemoryBroker, then you need to add context for dependency injection. It&#39;s easier to call <code>populate_context</code> when creating a <code>test_client</code> fixture.</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> taskiq_aiohttp

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function P(B,W){const e=c("ExternalLinkIcon"),l=c("Tabs");return d(),u("div",null,[v,m,h,n("p",null,[s("We created a library "),n("a",b,[s("aiohttp-deps"),a(e)]),s(" to add FastAPI-like dependency injection in AioHTTP.")]),y,n("p",null,[s("You can read more about dependency injection and available dependencies in the project's "),n("a",_,[s("README.md"),a(e)]),s(".")]),f,n("p",null,[s("We highly recommend using aiohttp with aiohttp-deps because it allows us to reuse the same dependencies for your handlers and tasks. First of all, you should install the "),n("a",g,[s("taskiq-aiohttp"),a(e)]),s(" library.")]),w,a(l,{id:"37",data:[{id:"Annotated 3.10+"},{id:"default values"}]},{title0:t(({value:i,isActive:o})=>[s("Annotated 3.10+")]),title1:t(({value:i,isActive:o})=>[s("default values")]),tab0:t(({value:i,isActive:o})=>[q]),tab1:t(({value:i,isActive:o})=>[T]),_:1}),x,A,n("p",null,[s("You can find more detailed examples in the "),n("a",j,[s("examples repo"),a(e)]),s(".")]),I])}const C=r(k,[["render",P],["__file","taskiq-with-aiohttp.html.vue"]]);export{C as default};
