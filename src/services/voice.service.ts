window["SpeechRecognition"] = window["SpeechRecognition"] || window["webkitSpeechRecognition"];

export class VoiceService {
  private readonly commandRegex = /^search for(.*$)/g;
  private recognition = new SpeechRecognition();
  private promise: Promise<string | null> | null = null;
  private promiseResolve: ((value: string | null) => void) | null = null;
  private promiseReject: ((error?: SpeechRecognitionError) => void) | null = null;

  constructor() {
    this.recognition.lang = "en-US";
    this.recognition.onresult = this.handleResult.bind(this);
    this.recognition.onerror = this.handleError.bind(this);
    this.recognition.onend = this.recognition.stop;
    this.recognition.onspeechend = this.recognition.stop;
    this.recognition.onaudioend = this.recognition.stop;
    this.recognition.onsoundend = this.recognition.stop;
  }

  private handleResult(event: SpeechRecognitionEvent) {
    this.recognition.stop();

    if (this.promiseResolve) {
      const result = this.commandRegex.exec(event.results[0][0].transcript.toLowerCase());
      this.promiseResolve(result && result[1].trim());

      this.promiseResolve = null;
      this.promise = null;
    }
  }

  private handleError(error: SpeechRecognitionError) {
    this.recognition.stop();

    if (this.promiseReject) {
      this.promiseReject(error);
      this.promise = this.promiseResolve = this.promiseReject = null;
    }
  }

  startListening(): Promise<string | null> {
    if (this.promise) {
      this.recognition.stop();
    }

    this.recognition.start();

    return (this.promise = new Promise<string | null>((resolve, reject) => {
      this.promiseResolve = resolve;
      this.promiseReject = reject;
    }));
  }

  stopListening(): void {
    this.recognition.stop();
  }
}

export default new VoiceService();
