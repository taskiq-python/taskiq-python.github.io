import{_ as n,V as s,W as a,X as e}from"./framework-54aca795.js";const t={},o=e(`<h1 id="result-backend" tabindex="-1"><a class="header-anchor" href="#result-backend" aria-hidden="true">#</a> Result backend</h1><p>Result backends are used to store information about task execution. To create new <code>result_backend</code> you have to implement <code>taskiq.abc.result_backend.AsyncResultBackend</code> class.</p><p>Here&#39;s a minimal example of a result backend:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> typing <span class="token keyword">import</span> TypeVar

<span class="token keyword">from</span> taskiq <span class="token keyword">import</span> TaskiqResult
<span class="token keyword">from</span> taskiq<span class="token punctuation">.</span>abc<span class="token punctuation">.</span>result_backend <span class="token keyword">import</span> AsyncResultBackend

_ReturnType <span class="token operator">=</span> TypeVar<span class="token punctuation">(</span><span class="token string">&quot;_ReturnType&quot;</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">MyResultBackend</span><span class="token punctuation">(</span>AsyncResultBackend<span class="token punctuation">[</span>_ReturnType<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">startup</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Do something when starting broker.&quot;&quot;&quot;</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">shutdown</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Do something on shutdown.&quot;&quot;&quot;</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">set_result</span><span class="token punctuation">(</span>
        self<span class="token punctuation">,</span>
        task_id<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        result<span class="token punctuation">:</span> TaskiqResult<span class="token punctuation">[</span>_ReturnType<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token comment"># Here you must set result somewhere.</span>
        <span class="token keyword">pass</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">get_result</span><span class="token punctuation">(</span>
        self<span class="token punctuation">,</span>
        task_id<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        with_logs<span class="token punctuation">:</span> <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">False</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> TaskiqResult<span class="token punctuation">[</span>_ReturnType<span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token comment"># Here you must retrieve result by id.</span>

        <span class="token comment"># Logs is a part of a result.</span>
        <span class="token comment"># Here we have a parameter whether you want to</span>
        <span class="token comment"># fetch result with logs or not, because logs</span>
        <span class="token comment"># can have a lot of info and sometimes it&#39;s critical</span>
        <span class="token comment"># to get only needed information.</span>
        <span class="token keyword">pass</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">is_result_ready</span><span class="token punctuation">(</span>
        self<span class="token punctuation">,</span>
        task_id<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">bool</span><span class="token punctuation">:</span>
        <span class="token comment"># This function checks if result of a task exists,</span>
        <span class="token comment"># without actual fetching the result.</span>
        <span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">Cool tip!</p><p>It&#39;s a good practice to skip fetching logs from the storage unless <code>with_logs=True</code> is explicitly specified.</p></div><div class="hint-container danger"><p class="hint-container-title">Important note!</p><p><code>with_logs</code> param is now deprecated. It will be removed in future releases.</p></div>`,6),p=[o];function i(c,l){return s(),a("div",null,p)}const r=n(t,[["render",i],["__file","resutl-backend.html.vue"]]);export{r as default};
