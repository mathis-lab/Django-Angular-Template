from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Pdv
from .serializers import PdvSerializer, PdvLSerializer, PdvUSerializer


class PdvLC(ListCreateAPIView):
    queryset = Pdv.objects.all()
    serializer_class = PdvSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PdvLSerializer
        return super().get_serializer_class()


class PdvRUD(RetrieveUpdateDestroyAPIView):
    queryset = Pdv.objects.all()
    serializer_class = PdvSerializer

    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return PdvUSerializer
        return super().get_serializer_class()
