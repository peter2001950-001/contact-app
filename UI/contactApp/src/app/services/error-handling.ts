import { MessageService } from 'primeng/api';
export function errorHandling(err: any, messageService: MessageService){
    if(err.error?.errors){
      err.error?.errors.forEach((erro:any) => {
          messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: erro.message[0]
          });

        })

    }else{
      messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Something went wrong'
      });
    }
}
