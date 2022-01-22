/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable react/display-name */
import React from 'react';

import MarkdownIt from 'markdown-it';

const markdownItMark = require('markdown-it-mark');
const markdownItSub = require('markdown-it-sub');
const markdownItSup = require('markdown-it-sup');

export const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(markdownItSup)
  .use(markdownItSub)
  .use(markdownItMark);

md.renderer.rules.ordered_list_open = () =>
  '<ol class="list-decimal pl-8 my-1">';
md.renderer.rules.bullet_list_open = () => '<ul class="list-disc pl-8 my-1">';
md.renderer.rules.blockquote_open = () =>
  '<blockquote class="px-5 py-2 border-l border-blueGray-300 my-1">';

type MarkdownEditorProps = {
  initialState?: 'write' | 'preview';
  value: string;
  label?: string;
  labelClassName?: string;
  onChange: (value: string) => void;
};

type MarkdownPreviewProps = {
  mdContent: string;
  iframeTitle?: string;
  renderInIframe?: boolean;
  className?: string;
};

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = React.memo(
  ({ mdContent, className }) => (
    <div>
      <div
        className={`w-full ${className ?? ''}`}
        dangerouslySetInnerHTML={{ __html: md.render(mdContent) }}
      ></div>
    </div>
  ),
);
