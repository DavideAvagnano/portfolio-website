import { Button } from "@/components/ui/button"
import { HiDownload } from "react-icons/hi"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export const ResumeDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-8 rounded-md px-3 text-xs sm:h-9 sm:px-4 sm:py-2 sm:text-sm"
        >
          Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download CV</DialogTitle>
          <DialogDescription>You can choose the language</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center">
          <a
            href="https://drive.google.com/file/d/1WAZWKknwi6YVVarqwIGDDTqjZ5VbQhAY/view?usp=sharing"
            target="_blank"
            aria-label="download CV english version"
            className="group flex items-center justify-center gap-3"
          >
            <Button variant="link" className="p-0 group-hover:text-accent">
              English
            </Button>
            <HiDownload
              size={18}
              className="group-hover:scale-125 group-hover:text-accent"
            />
          </a>
          <a
            href="https://drive.google.com/file/d/1j589kxU4iPoAGMDFwhzHvhF5N8OHSI-b/view?usp=sharing"
            target="_blank"
            aria-label="download CV Italian version"
            className="group flex items-center justify-center gap-3"
          >
            <Button variant="link" className="p-0 group-hover:text-accent">
              Italian
            </Button>
            <HiDownload
              size={18}
              className="group-hover:scale-125 group-hover:text-accent"
            />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
