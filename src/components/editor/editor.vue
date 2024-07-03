<template>
    <div class="editor-wrapper bg-gray-300 h-full max-h-full grid grid-rows-2">
        <div class="toolbar">
            <toolbar/>
        </div>
        <div class="content h-full relative">
            <div id="content" contenteditable="true" class="absolute top-0 bottom-0 w-full overflow-y-auto focus:outline-none pl-2">
            </div>
            <div id="preview" class="preview markdown absolute right-0 top-0 bottom-0 left-1/2 z-40">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import toolbar from './toolbar.vue';

    import { ref, onMounted } from 'vue';
    import markdownit from 'markdown-it';
    import hljs from 'highlight.js'

    let md = markdownit({
        html: true,
        linkify: true,
        typographer: true,
        breaks: true,
        highlight: function (str: any, lang: any) {
            if (hljs.getLanguage(lang)) {
                return '<pre><code class="hljs">' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            }

            // return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    })
    let parsed_md: string;
    let raw_content: HTMLElement | null;
    let preview: HTMLElement | null;

    onMounted(()=> {
        raw_content = document.getElementById('content');
        preview = document.querySelector("#preview");

        
        raw_content?.addEventListener('input', ()=> {
            parsed_md = md.render(raw_content?.innerText);
            preview.innerHTML = parsed_md
            preview?.dataset.
            hljs.highlightElement(preview);
        })
    })

</script>

<style scoped>
    .editor-wrapper{
        grid-template-rows: 7.8% 92.2%;
        grid-template-areas: "toolbar" "content";
    }

    .toolbar{
        grid-area: toolbar;
    }

    .content{
        grid-area: content;
    }
</style>