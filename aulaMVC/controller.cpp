#include "view.cpp"
#include "model.cpp"

using namespace std;

class Controller
{
public:
    Model model;
    View view;
    Controller(View v, Model m)
    {
        model = m;
        view = v;
    }
    void appBehaviour()
    {
        view.interfaceValores();
        int valor = view.getNum();
        char operacao = view.getOperacao();
        model.setNumero(valor);
        double resultado;
        if (operacao == 'f')
        {
            resultado = model.fatorial();
        }
        else if (operacao == 'r')
        {
            resultado = model.raiz();
        }
        else if (operacao == 'q')
        {
            resultado = model.quadrado();
        }
        view.setResultado(resultado);
        view.interfaceResultado();
    }
};