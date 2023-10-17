import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as e}from"./app-04ae6ff1.js";const t={},i=e(`<h1 id="result-backend" tabindex="-1"><a class="header-anchor" href="#result-backend" aria-hidden="true">#</a> Result backend</h1><p>Result backends are used to store information about task execution. To create new <code>result_backend</code> you have to implement <code>taskiq.abc.result_backend.AsyncResultBackend</code> class.</p><p>Here&#39;s a minimal example of a result backend:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> typing <span class="token keyword">import</span> TypeVar

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
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        Set result in your backend.

        :param task_id: current task id.
        :param result: result of execution.
        &quot;&quot;&quot;</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">get_result</span><span class="token punctuation">(</span>
        self<span class="token punctuation">,</span>
        task_id<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        with_logs<span class="token punctuation">:</span> <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">False</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> TaskiqResult<span class="token punctuation">[</span>_ReturnType<span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        Here you must retrieve result by id.

        Logs is a part of a result.
        Here we have a parameter whether you want to
        fetch result with logs or not, because logs
        can have a lot of info and sometimes it&#39;s critical
        to get only needed information.

        :param task_id: id of a task.
        :param with_logs: whether to fetch logs.
        :return: result.
        &quot;&quot;&quot;</span>
        <span class="token keyword">return</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>  <span class="token comment"># type: ignore</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">is_result_ready</span><span class="token punctuation">(</span>
        self<span class="token punctuation">,</span>
        task_id<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">bool</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        Check if result exists.

        This function must check whether result
        is available in your result backend
        without fetching the result.

        :param task_id: id of a task.
        :return: True if result is ready.
        &quot;&quot;&quot;</span>
        <span class="token keyword">return</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>  <span class="token comment"># type: ignore</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">Cool tip!</p><p>It&#39;s a good practice to skip fetching logs from the storage unless <code>with_logs=True</code> is explicitly specified.</p></div><div class="hint-container danger"><p class="hint-container-title">Important note!</p><p><code>with_logs</code> param is now deprecated. It will be removed in future releases.</p></div>`,6),o=[i];function l(p,c){return s(),a("div",null,o)}const d=n(t,[["render",l],["__file","resutl-backend.html.vue"]]);export{d as default};
