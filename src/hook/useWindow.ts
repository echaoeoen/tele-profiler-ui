function getWindowDimensions() {
    try {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
    } catch {
        return {
            width: 0,
            height: 1000
        }
    }
  }
  
export const useWindow = () => {
    const {
        width,
        height
    } = getWindowDimensions();
    return { width, height }
}