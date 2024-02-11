"use client";

import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";
import { Toggle } from "./ui/toggle";

const TiptapToolBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return;
  }
  return (
    <>
      <div>
        <Toggle
          size={"sm"}
          pressed={editor.isActive("heading", { level: 1 })}
          onPressedChange={() => {
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
        >
          <Heading1 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive("heading", { level: 2 })}
          onPressedChange={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive("heading", { level: 3 })}
          onPressedChange={() => {
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
        >
          <Heading3 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive("heading", { level: 4 })}
          onPressedChange={() => {
            editor.chain().focus().toggleHeading({ level: 4 }).run();
          }}
        >
          <Heading4 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive("heading", { level: 5 })}
          onPressedChange={() => {
            editor.chain().focus().toggleHeading({ level: 5 }).run();
          }}
        >
          <Heading5 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive("heading", { level: 6 })}
          onPressedChange={() => {
            editor.chain().focus().toggleHeading({ level: 6 }).run();
          }}
        >
          <Heading6 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive("bold")}
          onPressedChange={() => {
            editor.chain().focus().toggleBold().run();
          }}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive("italic")}
          onPressedChange={() => {
            editor.chain().focus().toggleItalic().run();
          }}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive("strike")}
          onPressedChange={() => {
            editor.chain().focus().toggleStrike().run();
          }}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive("bulletList")}
          onPressedChange={() => {
            editor.chain().focus().toggleBulletList().run();
          }}
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive("orderedList")}
          onPressedChange={() => {
            editor.chain().focus().toggleOrderedList().run();
          }}
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
      </div>
    </>
  );
};

export default TiptapToolBar;
