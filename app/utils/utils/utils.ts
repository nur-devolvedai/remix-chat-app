export const copyToClipboard = (
    code: string,
    index: number,
    setCopiedIndex: (index: number | null) => void
  ): void => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text to clipboard:", err);
      });
  };
  
  export const onScroll = (
    sectionRef: React.RefObject<HTMLElement>,
    setIsAtBottom: (isAtBottom: boolean) => void
  ): void => {
    if (sectionRef.current) {
      const isScrolledToBottom =
        sectionRef.current.scrollHeight - sectionRef.current.clientHeight <=
        sectionRef.current.scrollTop + 1;
      setIsAtBottom(isScrolledToBottom);
    }
  };
  
  export const scrollToBottom = (sectionRef: React.RefObject<HTMLElement>): void => {
    if (sectionRef.current) {
      sectionRef.current.scrollTop = sectionRef.current.scrollHeight;
    }
  };
  