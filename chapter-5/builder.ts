class RequestBuilder {
  private data: object | null = null;
  private method: 'get' | 'post' | null = null;
  private url: string | null = null;

  setMethod(method: 'get' | 'post'): this {
    this.method = method;
    return this;
  }

  setData(data: object): this {
    this.data = data;
    return this;
  }

  setURL(url: string): this {
    this.url = url;
    return this;
  }

  send() {
    // ...
  }
}

new RequestBuilder()
  .setURL('/users')
  .setMethod('get')
  .setData({ firstName: 'Anna' })
  .send();
